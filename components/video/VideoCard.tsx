import { VideoInfo } from '@/api/types'
import Image from "next/image";
import Link from "next/link";
import { CircleUser, EllipsisVertical, Clock4, Ban, CircleMinus, Bookmark, ArrowDownToLine, Redo2, ListPlus, Flag } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface VideoCardVideoProps {
    videoInfo: VideoInfo;
    layout?: "grid" | "list";
    compact?: boolean;
}

const formatViews = (views: number) => {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
    if (views >= 1000) return (views / 1000).toFixed(1) + "K";
    return views.toString();
};

function VideoCard({ videoInfo, layout = "grid", compact = false }: VideoCardVideoProps) {
    const formatDuration = (duration?: number) => {
        if (!duration) return "00:00";
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return `${hours ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    if (layout === "list") {
        return (
            <article className="flex w-full max-w-3xl gap-3">
                <Link
                    className={`relative block aspect-video shrink-0 overflow-hidden rounded-xl ${compact ? "w-56" : "w-44 sm:w-78.75"}`}
                    href={`/watch/${videoInfo._id}`}
                >
                    <Image
                        src={videoInfo.thumbnail}
                        alt={videoInfo.title}
                        fill
                        sizes={compact ? "224px" : "(max-width: 640px) 176px, 315px"}
                        className="object-cover"
                    />
                    <span className="absolute bottom-1.5 right-1.5 rounded bg-black-black/80 px-1.5 py-0.5 text-xs font-semibold text-whites">
                        {formatDuration(videoInfo.duration)}
                    </span>
                </Link>
                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                        <Link
                            className="line-clamp-2 text-base font-semibold leading-5 text-foreground"
                            href={`/watch/${videoInfo._id}`}
                        >
                            {videoInfo.title}
                        </Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button type="button" className="ml-auto shrink-0 text-foreground" aria-label="More options">
                                    <EllipsisVertical className="size-5" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer"><ListPlus /> Add to queue</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer"><Clock4 /> Watch later</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer"><Bookmark /> Add to playlist</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer"><Flag /> Report</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {videoInfo.ownerDetails?.username ?? "Unknown channel"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {formatViews(videoInfo.views)} vizualizări · {new Date(videoInfo.createdAt).toLocaleDateString("ro-RO")}
                    </p>
                </div>
            </article>
        );
    }

    return (
        <div className="w-full max-w-[456.3px]">
            <Link
                className="relative block aspect-video w-full overflow-hidden rounded-2xl"
                href={`/watch/${videoInfo._id}`}
            >
                <Image
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                />
                <span className="absolute bottom-2 right-2 rounded bg-black-black/80 px-1.5 py-0.5 text-xs font-semibold text-whites">
                    {formatDuration(videoInfo.duration)}
                </span>
            </Link>
            <div className="mt-2 flex items-start gap-2">
                <Link href={`/channel/${videoInfo.ownerDetails?.username ?? videoInfo.owner}`}>
                    {videoInfo.ownerDetails?.avatar ? (
                        <Image
                            src={videoInfo.ownerDetails.avatar}
                            alt={videoInfo.ownerDetails.username}
                            width={32}
                            height={32}
                            className="size-8 rounded-full object-cover"
                        />
                    ) : (
                        <CircleUser className="size-8" />
                    )}
                </Link>
                <Link
                    className="font-bold line-clamp-2 text-foreground"
                    href={`/watch/${videoInfo._id}`}
                >
                    {videoInfo.title}
                </Link>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <button type="button" className="ml-auto cursor-pointer text-foreground">
                            <EllipsisVertical />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <ListPlus />
                            Add to queue
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Clock4 />
                            Watch later
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Bookmark />
                            Add to playlist
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <ArrowDownToLine />
                            dowload
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Redo2 />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Ban />
                            Not interested
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <CircleMinus />
                            Do not recommend videos from this channel
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Flag />
                            Report
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="text-xs text-gray-500 ml-10 mt-1">
                <div>{videoInfo.ownerDetails?.username}</div>
                {formatViews(videoInfo.views)} vizualizări · {new Date(videoInfo.createdAt).toLocaleDateString("ro-RO")}
            </div>

        </div>
    )
}

export default VideoCard