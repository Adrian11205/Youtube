"use client";

import { useState } from "react";
import { uploadNewVideo } from "@/api/requests";
import { VideoInfo } from "@/api/types";
import { useMutation } from "@tanstack/react-query";

interface UploadVideoProps {
    refetchVideo?: () => void;
    videoInfo?: VideoInfo;
}
export default function UploadVideo({ refetchVideo, videoInfo }: UploadVideoProps) {
    const [uploadError, setUploadError] = useState<string | null>(null);

    const uploadMutation = useMutation({
        mutationFn: uploadNewVideo,
        onSuccess: () => {
            refetchVideo?.();
        },
        onError: (error) => {
            setUploadError(error.message || "Upload failed");
        },
    });

    return (
        <form className="flex max-w-xl flex-col gap-4">
            {uploadError && <p className="text-red-500">{uploadError}</p>}
            <div>
                <label htmlFor="title">Title:</label>
                <input id="title" name="title"
                    defaultValue={videoInfo?.title}
                    type="text" placeholder="Title" required />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description"
                    defaultValue={videoInfo?.description}
                    placeholder="Description" required />
            </div>

            <div>
                <label htmlFor="videoFile">Video file:</label>
                <input id="videoFile" name="videoFile"
                    type="file" accept="video/*" required />
            </div>

            <div>
                <label htmlFor="thumbnail">Thumbnail:</label>
                <input id="thumbnail" name="thumbnail"
                    type="file" accept="image/*" required />
            </div>

            <div>
                <button
                    type="button"
                    disabled={uploadMutation.isPending}
                    onClick={(event) => {
                        const form = event.currentTarget.form;
                        if (!form) return;

                        setUploadError(null);
                        uploadMutation.mutate(new FormData(form), {
                            onSuccess: () => form.reset(),
                        });
                    }}
                >
                    {uploadMutation.isPending ? "Uploading..." : "Upload video"}
                </button>
            </div>


        </form>
    );
}