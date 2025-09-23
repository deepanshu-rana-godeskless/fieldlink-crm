
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/context/locale-context";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { t } = useLocale();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock authentication
        if (email && password) {
            router.push("/dashboard");
        } else {
            setError(t("login.error"));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <h2 className="text-3xl font-bold mb-6">{t("login.title")}</h2>
            <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder={t("login.email")}
                    className="px-4 py-2 border rounded"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder={t("login.password")}
                    className="px-4 py-2 border rounded"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
                <button
                    type="submit"
                    className="px-6 py-2 bg-foreground text-background rounded-lg font-semibold hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
                >
                    {t("login.button")}
                </button>
            </form>
        </div>
    );
}
