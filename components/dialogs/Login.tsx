import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { login } from "../..//api/requests";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface LoginProps {
    open: boolean,
    setOpen: () => void;
}

function Login({ open, setOpen }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { login: loginStore } = useAuthStore();
    const router = useRouter();

    const schema = z.object({
        email: z.string().email("Email is invalid"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });
    type Form = z.infer<typeof schema>;

    const logInMutation = useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            toast.success("loginSuccess");
            await loginStore(data.data.accessToken, data.data.refreshToken);
            router.push("/");
            setOpen();
        },
        onError: (error) => {
            toast.error(error?.message || "Eroare la autentificare");
        },
    });
    const { register, handleSubmit, formState: { errors } } = useForm<Form>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: Form) => {
        const payload = {
            email: data.email,
            password: data.password,
        };

        logInMutation.mutate(payload);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[90vw] max-w-120 rounded-[22px] border border-accent bg-background p-6 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"email"}</span>

                        <input
                            type="email"
                            {...register("email")}
                            className={`w-full border-2 rounded-xl h-10 px-3 pr-10 ${errors.email ? "border-destructive/70" : "border-blues/70"
                                }`}
                        />

                        {errors.email && (
                            <span className="text-destructive text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"Email"}</span>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "Password"}
                                {...register("password")}
                                className={`w-full border-2 rounded-xl h-10 px-3 pr-10 ${errors.password ? "border-destructive/70" : "border-blues/70"
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                            </button>
                        </div>

                        {errors.password && (
                            <span className="text-destructive text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blues/70 h-10 text-background rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {"Log in"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default Login