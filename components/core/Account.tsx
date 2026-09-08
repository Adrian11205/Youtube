"use client";

import {
    CircleHelp,
    CircleUser,
    Clapperboard,
    Globe2,
    Info,
    Keyboard,
    Languages,
    MessageSquare,
    Palette,
    Settings,
    ShieldCheck,
    ShoppingBag,
    Upload,
    UserRound,
    UsersRound
} from "lucide-react";
import SignOutAccount from "./SignOutAccount";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import Image from "next/image";

function Account() {
    const { user } = useAuthStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="-ml-6 flex items-center gap-2 cursor-pointer hover:opacity-80 transition outline-none">
                {user?.avatar && (
                    <Image
                        src={user.avatar}
                        alt="Avatar"
                        width={32}
                        height={32}
                        priority={true}
                        className="size-8 rounded-full object-cover"
                    />
                )}
                {!user?.avatar && <CircleUser className="size-8 text-blues" />}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48 bg-background border-0 text-foreground">
                <DropdownMenuLabel>{"myAccount"}</DropdownMenuLabel>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    {user?.avatar && (
                        <Image
                            src={user.avatar}
                            alt="Avatar"
                            width={32}
                            height={32}
                            priority={true}
                            className="size-8 rounded-full object-cover"
                        />
                    )}
                    <span className="text-sm font-semibold text-foreground">
                        <p>
                            {user?.fullname}
                        </p>
                        <p>@{user?.username}</p>
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Link
                        href={"/upload"}
                        className="flex items-center gap-2 cursor-pointer">
                        <Upload className="size-4 text-foreground" />
                        {"Upload"}
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Link
                        href={""}
                        className="flex items-center gap-2 cursor-pointer">
                        <UserRound className="size-4 text-foreground" />
                        {"Account Google"}
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Link
                        href={""}
                        className="flex items-center gap-2 cursor-pointer">
                        <UsersRound className="size-4 text-foreground" />
                        {"Change account"}
                    </Link>
                </DropdownMenuItem>

                {/* <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground"> */}
                <SignOutAccount />
                {/* </DropdownMenuItem> */}

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Clapperboard className="text-foreground" />
                    <span className="text-foreground">Творчества</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <ShoppingBag className="text-foreground" />
                    <span className="text-foreground">Покупки</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Info className="text-foreground" />
                    <span className="text-foreground">you info youtube</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Palette className="text-foreground" />
                    <span className="text-foreground">theme</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Languages className="text-foreground" />
                    <span className="text-foreground">language</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <ShieldCheck className="text-foreground" />
                    <span className="text-foreground">security mod</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Globe2 className="text-foreground" />
                    <span className="text-foreground">country</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Keyboard className="text-foreground" />
                    <span className="text-foreground">keybot</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <Settings className="text-foreground" />
                    <span className="text-foreground">setining</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <CircleHelp className="text-foreground" />
                    <span className="text-foreground">справка</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 border-b  cursor-pointer rounded-none hover:bg-accent hover:text-accent-foreground">
                    <MessageSquare className="text-foreground" />
                    <span className="text-foreground">отаравить отзыв</span>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Account;
