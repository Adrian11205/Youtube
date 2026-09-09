"use client"
import VideoCard from "@/components/video/VideoCard"
import { getAllVideo } from "@/api/requests";
import type { VideoInfo } from "@/api/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UploadVideo from "@/components/video/UploadVideo"
import { useState } from "react";
import { useSearchParams } from "next/navigation";

function VideoGrid() {
    const [showUploadVideo, setShowUploadVideo] = useState(false);
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";

    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["video", search],
        queryFn: () => getAllVideo({
            page: 1,
            limit: 10,
            sort: "-createdAt",
            search,
        }),
    });

    const videos: VideoInfo[] = data?.data?.Videos ?? data?.data?.videos ?? [];

    if (isLoading) return <p>Loading videos...</p>;
    if (error) return <p>Unable to load videos.</p>;

    return (
        <div>
            {showUploadVideo && (
                <div>
                    <UploadVideo
                        refetchVideo={() => {
                            queryClient.invalidateQueries({ queryKey: ["video"] })
                            setShowUploadVideo(false);

                        }} />
                </div>
            )}
            <div className="ml-16 grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {videos.map((video) => (
                    <VideoCard key={video._id} videoInfo={video} />
                ))}
            </div>
        </div>

    )
}

export default VideoGrid