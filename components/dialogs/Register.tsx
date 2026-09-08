import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { register as registerUser } from "../..//api/requests";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterProps {
    open: boolean,
    setOpen: () => void;
}

function Register({ open, setOpen }: RegisterProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuthStore();

    const schema = z.object({
        email: z.string().email("emailInvalid"),
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username must be at most 30 characters")
            .regex(/^[A-Za-z0-9_]+$/, "Username contains invalid characters"),
        firstName: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be at most 50 characters")
            .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Name contains invalid characters"),
        lastName: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be at most 50 characters")
            .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Name contains invalid characters"),
        password: z
            .string()
            .min(8, "Password must be between 8 and 16 characters.")
            .max(16, "Password must be between 8 and 16 characters.")
            .refine((value) => /\d/.test(value), {
                message: "Password must include one number.",
            })
            .refine((value) => /[,.?!@#$%^&*]/.test(value), {
                message: "Password must include one symbol.",
            }),
        phoneNumber: z.string().regex(/^\+?[0-9]{8,15}$/, "Phone number is invalid"),
        avatar: z.any()
    });

    type Form = z.infer<typeof schema>;

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>({
        resolver: zodResolver(schema),
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success("registeredSuccess");
            login(data.accessToken, data.refreshToken);
            setOpen();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (data: Form) => {
        const formData = new FormData();

        formData.append("email", data.email);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("fullname", `${data.firstName} ${data.lastName}`);

        const avatar = data.avatar?.[0];
        if (avatar) {
            formData.append("avatar", avatar);
        }

        registerMutation.mutate(formData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-center">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"email"}</span>
                        <input
                            type="email"
                            {...formRegister("email")}
                            className={`border-2 rounded-xl h-10 ${errors.email ? "border-destructive/70" : "border-blues/70"}`}
                        />
                        {errors.email && <span className="text-destructive">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"Username"}</span>
                        <input
                            type="text"
                            {...formRegister("username")}
                            className={`border-2 rounded-xl h-10 ${errors.username ? "border-destructive/70" : "border-blues/70"}`}
                        />
                        {errors.username && (
                            <span className="text-destructive">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"First name"}</span>
                        <input
                            type="text"
                            {...formRegister("firstName")}
                            className={`border-2 rounded-xl h-10 ${errors.firstName ? "border-destructive/70" : "border-blues/70"}`}
                        />
                        {errors.firstName && (
                            <span className="text-destructive">{errors.firstName.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"Last name"}</span>
                        <input
                            type="text"
                            {...formRegister("lastName")}
                            className={`border-2 rounded-xl h-10 ${errors.lastName ? "border-destructive/70" : "border-blues/70"}`}
                        />
                        {errors.lastName && (
                            <span className="text-destructive">{errors.lastName.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"Password"}</span>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...formRegister("password")}
                                className={`w-full border-2 rounded-xl h-10 px-3 pr-10 ${errors.password ? "border-destructive/70" : "border-blues/70"}`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                            </button>
                        </div>

                        {errors.password && <span className="text-destructive">{errors.password.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-2xl">{"Phone Number"}</span>
                        <input
                            type="text"
                            {...formRegister("phoneNumber")}
                            className={`border-2 rounded-xl h-10 ${errors.phoneNumber ? "border-destructive/70" : "border-blues/70"}`}
                        />
                        {errors.phoneNumber && (
                            <span className="text-destructive">{errors.phoneNumber.message}</span>
                        )}
                    </div>
                    <div>
                        <label className="font-black text-2xl">
                            Avatar User:
                        </label>
                        <input type="file" className="ml-2" {...formRegister("avatar")} />
                    </div>

                    <button
                        type="submit"
                        className="bg-blues/70 h-10 text-background mt-2 rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {"register"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default Register