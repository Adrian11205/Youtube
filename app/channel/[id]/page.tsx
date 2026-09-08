"use client";

import AuthGuard from "@/components/layout/AuthGuard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query"; import { CircleUser } from "lucide-react";
import { getUserChannel } from "@/api/requests";
import type { UserChannelProfile } from "@/api/types";

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

    if (!user) return <p>Chaneel not found.</p>;


    return (
        <AuthGuard>
            <div>
                My Channel
                {user.avatar ? (
                    <Image
                        src={user.avatar}
                        alt={user.username}
                        width={32}
                        height={32}
                        className="size-8 rounded-full object-cover"
                    />
                ) : (
                    <CircleUser className="size-8" />
                )}
                {user.username}
            </div>
        </AuthGuard>
    )
}

export default Channel