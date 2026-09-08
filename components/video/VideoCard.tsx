import { VideoInfo } from '@/api/types'
import Image from "next/image";
import Link from "next/link";
import { CircleUser, EllipsisVertical, Clock4,Ban ,CircleMinus ,Bookmark , ArrowDownToLine, Redo2, ListPlus, Flag } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface VideoCardVideoProps {
    videoInfo: VideoInfo;


}
function VideoCard({ videoInfo }: VideoCardVideoProps) {

  


    const formatDuration = (duration?: number) => {
        if (!duration) return "00:00";

        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

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
                <span className="absolute bottom-2 right-2 rounded bg-foreground/80 px-1.5 py-0.5 text-xs font-semibold text-whites">
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
                            Добавить в очередь
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Clock4 />
                            Watch later
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Bookmark />
                            Добавить в плеилист
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <ArrowDownToLine />
                            dowload
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Redo2 />
                            поделится
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Ban />
                            не интересует
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                          <CircleMinus  />
                            не ресомендовпть видео с этого канала
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-foreground">
                            <Flag />
                            пожаловаться
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <div className="font-bold line-clamp-2 text-foreground ">
                {videoInfo.description}
            </div>
        </div>
    )
}

export default VideoCard