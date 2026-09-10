import { getAllCommentsVideo, addCommentVideo, updateComment, deleteComment } from "@/api/requests"
import { useState, useEffect } from "react"
import type { CommentResponse } from "@/api/types"
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image";

interface CommentsProps {
    videoId: string;
}

function Comments({ videoId }: CommentsProps) {
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [content, setContent] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState("");
    useEffect(() => {
        getAllCommentsVideo(videoId).then((response) => {
            setComments(response.data.docs)
        })
    }, [videoId])

    const updateComentMutation = useMutation({
        mutationFn: ({
            commentId,
            content,
        }: {
            commentId: string;
            content: string;
        }) => updateComment(commentId, { content }),
        onSuccess: (response, variables) => {
            setComments((previousComments) =>
                previousComments.map((comment) =>
                    comment._id === variables.commentId
                        ? response.data
                        : comment,
                ),
            );
        },
    })

    const deleteCommentMutatia = useMutation({
        mutationFn: deleteComment,
        onSuccess: (_, commentId) => {
            setComments((previousComments) =>
                previousComments.filter(
                    (comment) => comment._id !== commentId,
                ),
            );
        },
    })

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Textarea
                    className="bg-whiteBlue"
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(event) => setContent(event.target.value)}

                />
                <button
                    className="cursor-pointer rounded-2xl border border-foreground px-3 py-1.5"
                    onClick={async () => {
                        if (!content.trim()) return;

                        try {
                            await addCommentVideo(videoId, { content });
                            const commentsResponse = await getAllCommentsVideo(videoId);
                            setComments(commentsResponse.data.docs);
                            setContent("");
                        } catch (error) {
                            console.error("Failed to add comment", error);
                        }
                    }}
                >
                    Add comment
                </button>
            </div>
            <div className="space-y-3 rounded-2xl bg-whiteBlue p-3">
                {comments.map((comment) => (
                    <div
                        className="space-y-2 border-b border-foreground/20 pb-3 last:border-b-0 last:pb-0"
                        key={comment._id}>
                        <div className="flex items-center gap-2">
                            {comment.ownerDetails?.avatar ? (
                                <Image
                                    src={comment.ownerDetails.avatar}
                                    alt={comment.ownerDetails.username}
                                    className="size-8 rounded-full object-cover"
                                    width={30}
                                    height={30}
                                />
                            ) : (
                                <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-sm text-background">
                                    {comment.ownerDetails?.username?.charAt(0).toUpperCase() ?? "?"}
                                </div>
                            )}
                            <span className="font-medium">
                                {comment.ownerDetails?.username ?? "Unknown user"}
                            </span>
                        </div>
                        {editingCommentId === comment._id ? (
                            <>
                                <Textarea
                                    className="bg-whiteBlue"
                                    value={editedContent}
                                    onChange={(event) => setEditedContent(event.target.value)}
                                />
                                <button
                                    className="rounded-2xl border border-foreground px-3 py-1.5"
                                    onClick={() => {
                                        if (!editedContent.trim()) return;

                                        updateComentMutation.mutate({
                                            commentId: comment._id,
                                            content: editedContent,
                                        });
                                        setEditingCommentId(null);
                                        setEditedContent("");
                                    }}
                                >
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{comment.content}</div>
                                <div className="flex gap-2">
                                    <button
                                        className="rounded-2xl border border-foreground px-2"
                                        onClick={() => {
                                            setEditingCommentId(comment._id);
                                            setEditedContent(comment.content);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="rounded-2xl border border-foreground px-2"
                                        onClick={() => {
                                            deleteCommentMutatia.mutate(comment._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Comments