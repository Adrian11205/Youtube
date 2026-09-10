"use client"

import { Suspense } from "react";
import Searchs from "@/components/core/Search";
import Register from "@/components/dialogs/Register";
import Login from "@/components/dialogs/Login"
import { useState } from "react";
import Account from "./Account";
import { useAuthStore } from "@/stores/useAuthStore";
import { CircleUser } from 'lucide-react'
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "@/components/core/Sidebar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

function Header() {
    const [isRegister, setIsRegister] = useState(false);
    const [isLog, setIsLog] = useState(false);
    const { isAuth, user } = useAuthStore();
    const isLoggedIn = isAuth && user !== null;
    const categories = [
        "All", "Gaming", "Music", "Experiments", "Mixes", "Power Tools",
        "Electrical Engineering", "Snacks", "Animated Films", "Role-Playing Games",
        "Recently Uploaded", "Watched", "New To You",
    ];

    return (
        <div className="fixed top-0 z-50 w-full bg-background">
            <div className="flex h-14 items-center bg-background">
                <Sidebar />
                <Link href="/">
                    <FaYoutube size={48} className="ml-4 text-destructive" />
                </Link>
                <Suspense fallback={null}>
                    <Searchs />
                </Suspense>

                {isLoggedIn ? (
                    <div className="-translate-x-6">
                        <Account />
                    </div>
                ) : (
                    <div className="ml-auto flex shrink-0">
                        <button
                            onClick={() => setIsRegister(true)}
                            className="mr-4 flex h-9.5 w-24.75 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-background hover:bg-blues/20"
                        >
                            <CircleUser className="size-5 text-blues" />
                            <span className="text-blues">Register</span>
                        </button>
                        <button
                            onClick={() => setIsLog(true)}
                            className="mr-4 flex h-9.5 w-24.75 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-background hover:bg-blues/20"
                        >
                            <CircleUser className="size-5 text-blues" />
                            <span className="text-blues">Login</span>
                        </button>
                    </div>
                )}
            </div>

            <ScrollArea className="w-full max-w-full whitespace-nowrap pl-20">
                <div className="flex w-max min-w-full space-x-4 p-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className="cursor-pointer h-8 shrink-0 rounded-2xl bg-whiteBlue px-3 text-sm text-foreground hover:bg-accent"
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <Register open={isRegister} setOpen={() => setIsRegister(false)} />
            <Login open={isLog} setOpen={() => setIsLog(false)} />
        </div>
    );
}

export default Header;