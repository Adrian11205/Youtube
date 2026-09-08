import { VideoInfo } from "@/api/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartProduct {
    videoLike: VideoInfo;
    quantity: number;
}

const getVideoLikeId = (item: unknown): string | undefined => {
    if (!item || typeof item !== "object") return undefined;

    const videoLike = (item as { videoLike?: unknown }).videoLike;
    if (!videoLike || typeof videoLike !== "object") return undefined;

    const videoId = (videoLike as { _id?: unknown })._id;
    return typeof videoId === "string" ? videoId : undefined;
};

interface LikeStore {
    videosLike: CartProduct[];
    setVideoLike: (video: CartProduct) => void;
    deleteVideoLike: (videoId: string) => void;
}

const useLikeStore = create<LikeStore>()(
    persist(
        (set, get) => ({
            videosLike: [],

            setVideoLike: (product) => {
                return set((state) => {
                    const validVideos = state.videosLike.filter(
                        (item): item is CartProduct => Boolean(getVideoLikeId(item)),
                    );
                    const videoId = getVideoLikeId(product);

                    if (!videoId) {
                        return { videosLike: validVideos };
                    }

                    return {
                        videosLike: validVideos.some(
                            (item) => getVideoLikeId(item) === videoId,
                        )
                            ? validVideos
                            : [...validVideos, product],
                    };
                });
            },

            deleteVideoLike: (productId) => {
                const newVideos = get().videosLike.filter(
                    (item) => {
                        const videoId = getVideoLikeId(item);
                        return videoId !== undefined && videoId !== productId;
                    },
                );
                return set({ videosLike: newVideos });
            },
        }),
        {
            name: "video-like",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useLikeStore;
