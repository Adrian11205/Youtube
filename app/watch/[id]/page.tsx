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
import { useState } from "react";
import VideoList from "@/components/video/VideoList";
import Comments from "@/components/comments/Comments";
import Link from "next/link";

const formatLike = (like: number) => {
    if (like >= 1000000) return (like / 1000000).toFixed(1) + "M";
    if (like >= 1000) return (like / 1000).toFixed(1) + "K";
    return like.toString();
};

export default function VideoPage() {
    const { isAuth } = useAuthStore()
    const queryClient = useQueryClient();
    const [likeCount, setLikeCount] = useState<number | null>(null);

    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["video", id],
        queryFn: () => getVideoByID(id),
        enabled: Boolean(id),
    });
    const { data: likedVideosResponse } = useQuery({
        queryKey: ["liked-videos"],
        queryFn: getAllLikedVideos,
        enabled: isAuth,
    });

    const video: VideoInfo | undefined = data?.data;

    if (isLoading) return <p>Loading video...</p>;
    if (error) return <p>Unable to load video.</p>;

    if (!video) return <p>Video not found.</p>;

    const likedVideos = likedVideosResponse?.data ?? [];
    const isLike = likedVideos.some(
        (item: { details?: VideoInfo }) => item.details?._id === video._id,
    );



    const handleLike = async () => {
        if (!isAuth) return;

        try {
            const response = await toggleLikeVideo(video._id);
            if (response?.data?.totalLikes !== undefined) {
                setLikeCount(response.data.totalLikes);
            }

            await queryClient.invalidateQueries({
                queryKey: ["liked-videos"],
            });
            await refetch();
        } catch (error) {
            console.error("Failed to toggle video like", error);
        }
    };

    return (
        <AuthGuard>
            <div className="grid ml-17 gap-4 p-3 lg:grid-cols-[minmax(0,1fr)_380px]" key={id}>
                <main className="min-w-0">
                    <video
                        src={video.videoFile}
                        poster={video.thumbnail}
                        controls
                        className="aspect-video w-full bg-foreground object-contain"
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                        {video.ownerDetails?.avatar ? (
                            <Link
                                href={`/channel/${video.ownerDetails.username ?? video.owner}`}
                            >
                                <Image
                                    src={video.ownerDetails.avatar}
                                    alt={video.ownerDetails.username}
                                    width={32}
                                    height={32}
                                    className="size-8 rounded-full object-cover"
                                />
                            </Link>

                        ) : (
                            <CircleUser className="size-8" />
                        )}
                        <h1 className="mr-auto">{video.title}</h1>

                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                className="flex h-10 items-center justify-center gap-2 rounded-2xl border border-border bg-whiteBlue px-4 transition-all duration-300 hover:scale-105"
                                disabled={!isAuth}
                                onClick={handleLike}
                                aria-label="Like this video"
                            >
                                <ThumbsUp
                                    size={18}
                                    className={`${isLike ? "fill-foreground text-foreground" : "text-foreground"} transition-colors`}
                                />
                                <span className="font-semibold">
                                    {formatLike(likeCount ?? video.likeCount ?? 0)}
                                </span>
                            </button>

                            <button className="flex h-10 items-center gap-2 rounded-2xl border border-border bg-whiteBlue px-4 transition-all duration-300 hover:scale-105">
                                <Redo2 size={18} />
                                Share
                            </button>
                            <button className="flex h-10 items-center gap-2 rounded-2xl border border-border bg-whiteBlue px-4 transition-all duration-300 hover:scale-105">
                                <Bookmark size={18} />
                                save
                            </button>
                        </div>
                    </div>
                    <p className="mt-3">{video.description}</p>
                    <Comments videoId={id} />
                </main>
                <aside className="min-w-0">
                    <VideoList compact />
                </aside>
            </div>
        </AuthGuard>
    );
}