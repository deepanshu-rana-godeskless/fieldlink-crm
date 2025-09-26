"use client";
import { useLocale } from "@/context/locale-context";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/ui/shine-border";
import { Particles } from "@/components/ui/particles";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { useTheme } from "next-themes";
import { useState } from "react";
import { login } from "@/services/loginApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PasswordInput } from "@/components/ui/password-input";

export default function Login() {
    const { t } = useLocale();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const username = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try {
            const response = await login({ username, password });

            localStorage.setItem("access_token", response.data[0].access_token);
            localStorage.setItem("refresh_token", response.data[0].refresh_token);

            toast.success("Welcome to FieldLink!", {
                description: `Hi ${response.data[0].personal_info.full_name}, you’ve successfully logged in! 🎉 Your workspace is ready.`,
                duration: 4000,
            });

            // Give user time to see toast before redirect
            setTimeout(() => router.push("/dashboard"), 1200);
        } catch (err: any) {
            // Extract the best possible error message
            const msg =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Login failed. Please try again.";

            toast.error("Login attempt failed", {
                description: `We couldn't sign you in. ${msg} If you forgot your password, use the reset link.`,
                action: {
                    label: "Try Again",
                    onClick: () => { },
                },
                duration: 5000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <BackgroundBeamsWithCollision className="w-full overflow-hidden">
            <div className="flex w-full h-full">
                {/* Left: Hero text and Particles */}
                <div className="relative w-1/2 h-full flex flex-col items-center justify-center px-8">
                    <Particles className="absolute inset-0 w-full h-full" />
                    <div className="relative z-10 flex flex-col items-start justify-center gap-4">
                        <span className="text-4xl md:text-5xl font-bold leading-tight mb-2">Think of field ops?</span>
                        <span className="text-5xl md:text-6xl font-extrabold mb-2">
                            <AuroraText>FieldLink CRM </AuroraText>
                            <span className="text-black font-normal">by</span>
                            <AuroraText> GoDeskless Inc.</AuroraText>
                        </span>
                        <span className="text-4xl md:text-5xl font-bold leading-tight mt-2 flex items-center gap-2">
                            it
                            <LineShadowText className="italic" shadowColor={theme.resolvedTheme === "dark" ? "white" : "black"}>
                                flows.
                            </LineShadowText>
                        </span>
                    </div>
                </div>

                {/* Right: Login Card with Magic UI ShineBorder */}
                <div className="flex flex-col justify-center items-center w-1/2 rounded-l-3xl">
                    <Card className="relative w-full max-w-sm overflow-hidden min-h-[200px] flex flex-col">
                        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} borderWidth={1} duration={12} />
                        <CardHeader className="flex flex-col items-center justify-center text-center">
                            <CardTitle className="w-full text-center">Sign in to FieldLink</CardTitle>
                            <CardDescription className="w-full text-center">
                                Enter your credentials to access your workspace
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form id="login-form" onSubmit={handleLogin}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <PasswordInput id="password" required />
                                    </div>

                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button
                                type="submit"
                                form="login-form"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </BackgroundBeamsWithCollision>
    );
}
