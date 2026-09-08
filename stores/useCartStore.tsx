import { UserResponse } from "@/api/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartVideo {
    video: UserResponse;
    quantity: number;
}

interface CartStore {
    videos: CartVideo[];
    setVideo: (video: CartVideo) => void;
    incrementQuantity: (videoId: string) => void;
    deleteVideo: (videoId: string) => void;
}

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            videos: [],

            incrementQuantity: (videotId) => {
                return set((state) => ({
                    videos: state.videos.map((item) =>
                        item.video._id === videotId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    ),
                }));
            },

            setVideo: (video) => {
                const existItem = get().videos.find(
                    (item) => item.video._id === video.video._id,
                );

                if (existItem) {
                    return get().incrementQuantity(video.video._id);
                }

                return set((state) => ({
                    videos: [...state.videos, video],
                }));
            },

            deleteVideo: (videotId) => {
                const newVideos = get().videos.filter((item) => item.video._id !== videotId);
                return set({ videos: newVideos });
            },
        }),

        {
            name: "video-cart",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useCartStore;
