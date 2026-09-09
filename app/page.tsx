"use client";

import VideoList from "@/components/video/VideoGrid";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Home() {
  const { isAuth } = useAuthStore();

  return (
    <div>
      {!isAuth ? (
        <div className="px-4 pt-6">
          <div className="mx-auto flex h-25 w-175 max-w-full flex-col items-center justify-center rounded-2xl border border-border bg-background px-4 text-center shadow-2xl">
            <h1 className="text-2xl font-bold text-foreground">
              Try to find something
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Start watching the video and we will select recommendations for you.
            </p>
          </div>
        </div>
      ) : (
        <VideoList />
      )}
    </div>
  );
}
