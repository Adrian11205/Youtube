"use client"

import { useAuthStore } from "@/stores/useAuthStore";
import type { ReactNode } from "react";

type AuthProps = {
    children: ReactNode;
};

export default function AuthGuard({ children }: AuthProps) {
    const { isAuth } = useAuthStore();

    if (!isAuth) {
        return (
            <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center text-center text-6xl text-red-500">
                You must be logged in to access this page!!!!.
            </div>
        );
    }
    return <>{children}</>;
}
