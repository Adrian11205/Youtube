"use client";

import AuthGuard from "@/components/layout/AuthGuard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CircleUser } from "lucide-react";
import { getUserChannel } from "@/api/requests";
import type { UserChannelProfile } from "@/api/types";
import VideoChanell from "@/components/video/VideoChaneel"

const formatCount = (count: number | undefined) => {
    if (count == null) return "0";
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count.toString();
};

function Channel() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery({
        queryKey: ["channel", id],
        queryFn: () => getUserChannel(id),
        enabled: Boolean(id),
    });

    if (isLoading) return <p>Loading channel...</p>;
    if (error) return <p>Unable to load channel.</p>;

    const user: UserChannelProfile | undefined = data?.data;
    if (!user) return <p>Channel not found.</p>;

    return (
        <AuthGuard>
            <div className="ml-17">
                {user.coverImage && (
                    <div className="relative h-40 w-full">
                        <Image
                            src={user.coverImage}
                            alt="Cover"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <div className="flex items-start gap-6 p-6">
                    {user.avatar ? (
                        <Image
                            src={user.avatar}
                            alt={user.username}
                            width={112}
                            height={112}
                            className="size-28 rounded-full object-cover shrink-0"
                        />
                    ) : (
                        <CircleUser className="size-28 shrink-0" />
                    )}

                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">{user.fullname}</h1>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>@{user.username}</span>
                            <span>•</span>
                            <span>{formatCount(user.subscribersCount)} subscribers</span>
                        </div>

                        <button
                            className={`mt-2 w-fit rounded-full px-4 py-2 text-sm font-medium ${user.isSubscribed
                                    ? "bg-secondary hover:bg-secondary/80"
                                    : "bg-foreground text-background hover:bg-foreground/90"
                                }`}
                        >
                            {user.isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                    </div>
                </div>
                <VideoChanell userId={user._id} />
            </div>
        </AuthGuard>
    );
}

export default Channel;