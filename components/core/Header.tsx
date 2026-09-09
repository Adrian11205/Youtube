"use client"

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
function Header() {
    const [isRegister, setIsRegister] = useState(false);
    const [isLog, setIsLog] = useState(false);
    const { isAuth, user } = useAuthStore();
    const isLoggedIn = isAuth && user !== null;

    return (
        <div >

            <div className="flex h-14 items-center bg-background">
                <Sidebar />

                <Link
                    href={"/"}>
                    <FaYoutube size={48} className="text-destructive ml-4" />
                </Link>
                <Searchs />


                {isLoggedIn ? (
                    <>
                        <div className="-translate-x-6">
                            <Account />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="ml-auto flex shrink-0">
                            <button
                                onClick={() => setIsRegister(true)}
                                className="mr-4 flex h-9.5 w-24.75 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-background text-primary-background hover:bg-blues/20">
                                <CircleUser className="text-blues size-5" />
                                <span className="text-blues">Register</span>
                            </button>
                            <button
                                onClick={() => setIsLog(true)}
                                className="mr-4 flex h-9.5 w-24.75 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-border bg-background text-primary-background hover:bg-blues/20">
                                <CircleUser className="text-blues size-5" />
                                <span className="text-blues">Login</span>
                            </button>
                        </div>
                    </>
                )}


            </div>

            <Register open={isRegister} setOpen={() => setIsRegister(false)} />
            <Login open={isLog} setOpen={() => setIsLog(false)} />

        </div>
    )
}
export default Header