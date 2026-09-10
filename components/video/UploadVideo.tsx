"use client";

import { useEffect, useState } from "react";
import { uploadNewVideo } from "@/api/requests";
import { VideoInfo } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface UploadVideoProps {
    refetchVideo?: () => void;
    videoInfo?: VideoInfo;
}

export default function UploadVideo({ refetchVideo, videoInfo }: UploadVideoProps) {
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (videoPreview) URL.revokeObjectURL(videoPreview);
            if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
        };
    }, [videoPreview, thumbnailPreview]);

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
        <div className="flex items-center ml-17">
            <form className="flex  w-full max-w-xl flex-col gap-5 rounded-xl border border-border bg-card p-6  ml-10 mt-10">
                <h2 className="text-lg font-semibold text-foreground">
                    {videoInfo ? "Edit video" : "Upload a new video"}
                </h2>

                {uploadError && (
                    <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                        {uploadError}
                    </p>
                )}

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="title" className="text-sm font-medium text-foreground">
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        defaultValue={videoInfo?.title}
                        type="text"
                        placeholder="Add a title that describes your video"
                        required
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="description" className="text-sm font-medium text-foreground">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={videoInfo?.description}
                        placeholder="Tell viewers about your video"
                        required
                        rows={4}
                        className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="videoFile" className="text-sm font-medium text-foreground">
                            Video file
                        </label>
                        <label
                            htmlFor="videoFile"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-3 py-6 text-center text-sm text-muted-foreground transition hover:border-ring hover:text-foreground"
                        >
                            <UploadCloud className="size-5" />
                            Select video
                        </label>
                        <input
                            id="videoFile"
                            name="videoFile"
                            type="file"
                            accept="video/*"
                            required
                            className="hidden"
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                setVideoPreview(file ? URL.createObjectURL(file) : null);
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="thumbnail" className="text-sm font-medium text-foreground">
                            Thumbnail
                        </label>
                        <label
                            htmlFor="thumbnail"
                            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-3 py-6 text-center text-sm text-muted-foreground transition hover:border-ring hover:text-foreground"
                        >
                            <ImageIcon className="size-5" />
                            Select image
                        </label>
                        <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            accept="image/*"
                            required
                            className="hidden"
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                setThumbnailPreview(file ? URL.createObjectURL(file) : null);
                            }}
                        />
                    </div>
                </div>

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
                    className="mt-2 self-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {uploadMutation.isPending ? "Uploading..." : "Upload video"}
                </button>
            </form>

            <div className="grid w-full max-w-2xl grid-cols-1 gap-6 rounded-xl border border-border bg-card p-6 ml-10 sm:grid-cols-2">
                <div>
                    <p className="mb-2 text-sm font-medium">Video preview</p>

                    <video
                        controls
                        className="h-64 w-full rounded-md object-cover"
                    >
                        {videoPreview && (
                            <source src={videoPreview} type="video/mp4" />
                        )}
                    </video>
                </div>

                <div>
                    <p className="mb-2 text-sm font-medium">Thumbnail preview</p>

                    {thumbnailPreview ? (
                        <Image
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="h-64 w-full rounded-md object-cover"
                            width={400}
                            height={250}
                        />
                    ) : (
                        <p className="flex h-64 items-center justify-center rounded-md border border-dashed border-input p-8 text-sm text-muted-foreground">
                            Select an image to preview it.
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
}