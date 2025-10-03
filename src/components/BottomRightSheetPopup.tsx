"use client";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { askIsra } from "@/services/gpt";

export function BottomRightSheetPopup() {
    // Chatbot state
    const [messages, setMessages] = React.useState<{ role: "user" | "ai"; text: string }[]>([]);
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    async function sendMessage(e?: React.FormEvent) {
        if (e) e.preventDefault();
        if (!input.trim()) return;
        setLoading(true);
        setError(null);
        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setInput("");
        const result = await askIsra(input);
        if ("error" in result) {
            setError(result.error);
        } else {
            let answer = result.answer;
            if (Array.isArray(result)) {
                answer = result[0]?.answer || "";
            }
            setMessages((prev) => [...prev, { role: "ai", text: answer }]);
        }
        setInput("");
        setLoading(false);
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Sheet>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SheetTrigger asChild>
                            <button className="bg-white rounded-full shadow-lg p-2 flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition relative">
                                <span className="absolute top-1 right-1 w-3 h-3">
                                    <span className="block w-full h-full rounded-full bg-red-500 animate-pulse"></span>
                                </span>
                                <Image src="/assets/isralogo.png" alt="Isra Logo" width={40} height={40} />
                            </button>
                        </SheetTrigger>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8}>ISRA</TooltipContent>
                </Tooltip>
                {/* Removed the default close icon (no SheetClose) */}
                <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col">
                    {/* <SheetHeader>
                        <SheetTitle>ISRA - Intelligent Support Resolution Assistant</SheetTitle>
                    </SheetHeader> */}
                    <SheetHeader className="border-b pb-3">
                        <h2 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold text-xl">
                            ISRA <p className="text-xs text-muted-foreground">Your AI-powered support assistant</p>
                        </h2>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-4 py-2 bg-slate-50 rounded mb-4 border border-slate-100">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-400 py-8 space-y-2">
                                <div>Start the conversation...</div>
                                <div className="text-xs text-gray-500 italic">
                                    ISRA is in beta — responses may not be fully reliable. Please use with discretion.
                                </div>
                            </div>
                        )}
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                                        msg.role === "user"
                                            ? "bg-blue-100 text-blue-900"
                                            : "bg-white text-gray-900 border border-slate-200"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="mb-4 flex justify-start">
                                <div className="max-w-[80%] px-4 py-2 rounded-lg text-sm bg-white text-gray-400 border border-slate-200 animate-pulse">
                                    Thinking...
                                </div>
                            </div>
                        )}
                        {error && <div className="text-red-500 text-xs text-center mb-2">{error}</div>}
                    </div>
                    <form onSubmit={sendMessage} className="flex gap-2 px-4 pb-4">
                        <input
                            type="text"
                            className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Type your question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                        />
                        <Button type="submit" disabled={loading || !input.trim()} variant="default">
                            Send
                        </Button>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    );
}
