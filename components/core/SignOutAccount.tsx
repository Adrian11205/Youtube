"use client"
import { LogOut } from 'lucide-react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog'
import { logout } from "@/api/requests"
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from 'sonner';



function SignOutAccount() {
    const logoutStore = useAuthStore((set) => set.logout);

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSettled: () => {
            logoutStore()
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="w-full flex items-center h-8 text-left border-b gap-3 cursor-pointer bg-background text-destructive hover:bg-destructive/10 hover:border-destructive" >
                    <LogOut className="w-4 h-4 text-destructive ml-2" />
                    <span>{"signOutAccount"}</span>

                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm bg-background text-foreground shadow-xl ring-1 ring-border">
                <DialogHeader>
                    <DialogTitle>{"logoutTitle"}</DialogTitle>
                    <DialogDescription>
                        {"logoutDescription"}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="w-full rounded-3xl border border-border bg-background text-foreground px-4 py-3 text-sm font-medium hover:bg-brand/10 hover:text-brand"
                        >
                            {"cancel"}
                        </button>
                    </DialogClose>
                    <DialogClose asChild>
                        <button
                            type="button"
                            onClick={ ()=>{logoutMutation.mutate()}}
                            className="w-full rounded-3xl border border-border text-destructive bg-background px-4 py-3 text-sm font-medium hover:bg-destructive/10 hover:text-destructive"
                        >
                            {"logout"}
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SignOutAccount