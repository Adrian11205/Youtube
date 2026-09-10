"use client";

import Link from "next/link";
import { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    Clock3,
    History,
    House,
    ListVideo,
    Menu,
    PlaySquare,
    ThumbsUp,
    UserRound,
    UsersRound,
} from "lucide-react";

const subscriptions = [
    "user1",
    "nature",
    "cosmos",
    "auto",
    "Front",
    "Back"
];

const primaryLinks = [
    { label: "Home", href: "/", icon: House },
    { label: "Shorts", href: "/", icon: PlaySquare },
];

const personalLinks = [
    { label: "My channel", href: "/", icon: UserRound },
    { label: "History", href: "/", icon: History },
    { label: "Playlists", href: "/", icon: ListVideo },
    { label: "Watch later", href: "/", icon: Clock3 },
    { label: "Liked videos", href: "/", icon: ThumbsUp },
];

function Sidebar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <button
                type="button"
                aria-label="Open menu"
                aria-expanded={expanded}
                onClick={() => setExpanded((value) => !value)}
                className="flex h-10 w-16 shrink-0 cursor-pointer items-center justify-start rounded-full pl-6.5 text-foreground hover:bg-accent"
            >
                <Menu className="size-6" />
            </button>

            <aside
                className={`fixed top-14 bottom-0 left-0 z-40 w-20 overflow-y-auto overscroll-contain bg-background px-3 py-3 text-foreground ${expanded ? "w-64" : ""}`}
            >
                <nav
                    aria-label="Compact navigation"
                    className={expanded ? "hidden" : "block"}
                >
                    {[...primaryLinks, { label: "Subscriptions", href: "/", icon: ListVideo }, { label: "You", href: "/", icon: UserRound }].map(({ label, href, icon: Icon }) => (
                        <Link
                            key={label}
                            href={href}
                            title={label}
                            className="flex h-20 flex-col items-center justify-center gap-2 rounded-xl text-[11px] hover:bg-accent"
                        >
                            <Icon className="size-6" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                <nav
                    aria-label="Main navigation"
                    className={expanded ? "block" : "hidden"}
                >
                    <div className="space-y-1">
                        {primaryLinks.map(({ label, href, icon: Icon }, index) => (
                            <Link
                                key={label}
                                href={href}
                                title={label}
                                className={`flex h-12 items-center gap-6 rounded-xl px-4 text-sm font-medium hover:bg-accent ${index === 0 ? "bg-accent" : ""}`}
                            >
                                <Icon className="size-6 shrink-0" />
                                <span className="truncate max-md:hidden">{label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="my-4 border-t border-border" />

                    <section className="space-y-1">
                        <div className="flex h-10 items-center justify-between px-4 text-base font-semibold">
                            <span className="max-md:hidden">Subscriptions</span>
                            <ChevronRight className="size-5 max-md:hidden" />
                            <UsersRound className="size-6 md:hidden" />
                        </div>
                        {subscriptions.map((subscription) => (
                            <Link
                                key={subscription}
                                href="/"
                                title={subscription}
                                className="flex h-12 items-center gap-6 rounded-xl px-4 text-sm hover:bg-accent"
                            >
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
                                    {subscription.charAt(0)}
                                </span>
                                <span className="min-w-0 truncate max-md:hidden">{subscription}</span>
                                
                            </Link>
                        ))}
                        <button
                            type="button"
                            onClick={() => setExpanded((value) => !value)}
                            className="flex h-12 w-full cursor-pointer items-center gap-6 rounded-xl px-4 text-sm hover:bg-accent"
                        >
                            <ChevronDown className="size-6 shrink-0" />
                            <span className="max-md:hidden">Expand</span>
                        </button>
                    </section>

                    <div className="my-4 border-t border-border" />

                    <section className="space-y-1">
                        <div className="flex h-10 items-center justify-between px-4 text-base font-semibold">
                            <span className="max-md:hidden">You</span>
                            <ChevronRight className="size-5 max-md:hidden" />
                            <UserRound className="size-6 md:hidden" />
                        </div>
                        {personalLinks.map(({ label, href, icon: Icon }) => (
                            <Link
                                key={label}
                                href={href}
                                title={label}
                                className="flex h-12 items-center gap-6 rounded-xl px-4 text-sm hover:bg-accent"
                            >
                                <Icon className="size-6 shrink-0" />
                                <span className="max-md:hidden">{label}</span>
                            </Link>
                        ))}
                    </section>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar