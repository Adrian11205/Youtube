"use client";

import { getAllLikedVideos, getVideoByID, toggleLikeVideo } from "@/api/requests";
import type { VideoInfo } from "@/api/types";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { CircleUser, ThumbsUp, Redo2, Bookmark } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import AuthGuard from "@/components/layout/AuthGuard";
import { useQueryClient } from "@tanstack/react-query";

export default function VideoPage() {
    const { isAuth } = useAuthStore()
    const queryClient = useQueryClient();

    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery({
        queryKey: ["video", id],
        queryFn: () => getVideoByID(id),
        enabled: Boolean(id),
    });
    const { data: likedVideosResponse } = useQuery({
        queryKey: ["liked-videos"],
        queryFn: getAllLikedVideos,
        enabled: isAuth,
    });

    if (isLoading) return <p>Loading video...</p>;
    if (error) return <p>Unable to load video.</p>;

    const video: VideoInfo | undefined = data?.data;

    if (!video) return <p>Video not found.</p>;

    const likedVideos = likedVideosResponse?.data ?? [];
    const isLike = likedVideos.some(
        (item: { details?: VideoInfo }) => item.details?._id === video._id,
    );

    return (
        <AuthGuard>
            <div className="ml-4">
                <video
                    src={video.videoFile}
                    poster={video.thumbnail}
                    controls
                    width="800"
                />
                <div className="mt-2 flex items-start gap-2">
                    {video.ownerDetails?.avatar ? (
                        <Image
                            src={video.ownerDetails.avatar}
                            alt={video.ownerDetails.username}
                            width={32}
                            height={32}
                            className="size-8 rounded-full object-cover"
                        />
                    ) : (
                        <CircleUser className="size-8" />
                    )}
                    <h1>{video.title}</h1>

                    <div className="flex items-start gap-2 ml-10">
                        <button
                            className="flex items-center justify-center gap-2 border border-border rounded-2xl bg-whiteBlue w-29.5 h-10"
                            disabled={!isAuth}
                            onClick={async () => {
                                if (!isAuth) return;

                                try {
                                    await toggleLikeVideo(video._id);
                                    await queryClient.invalidateQueries({
                                        queryKey: ["liked-videos"],
                                    });
                                    await queryClient.invalidateQueries({
                                        queryKey: ["video", id],
                                    });
                                } catch (error) {
                                    console.error("Failed to toggle video like", error);
                                }
                            }}
                        >
                            <ThumbsUp className={isLike ? "text-blues" : "text-foreground"} />
                            {video.likeCount ?? 0}
                        </button>

                        <button className="flex items-start">
                            <Redo2 />
                            поделится
                        </button>
                        <button className="flex items-start">
                            <Bookmark />
                            save
                        </button>
                    </div>

                </div>
                <p>{video.description}</p>

            </div>
        </AuthGuard>
    );
}