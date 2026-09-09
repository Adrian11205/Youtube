"use client";

import VideoCard from "@/components/video/VideoCard";
import { useQuery } from "@tanstack/react-query";
import { getAllVideo } from "@/api/requests";
import type { VideoInfo } from "@/api/types";

type VideoChannelProps = {
    userId: string;
};

function VideoChannel({ userId }: VideoChannelProps) {

    const { data, isLoading, error } = useQuery({
        queryKey: ["videoChannel", userId],
        queryFn: () => getAllVideo({
            page: 1,
            limit: 10,
            sort: "-createdAt",
            userId,
        }),
        enabled: Boolean(userId),
    });

    const videos: VideoInfo[] = data?.data?.Videos ?? data?.data?.videos ?? [];

    if (isLoading) return <p>Loading videos...</p>;
    if (error) return <p>Unable to load videos.</p>;

    return (
        <div className="flex flex-col gap-3 p-4 sm:p-6">
            {videos.length === 0 ? (
                <p>No videos yet.</p>
            ) : (
                videos.map((video) => (
                    <VideoCard key={video._id} videoInfo={video} layout="list" />
                ))
            )}
        </div>
    );
}

export default VideoChannel;