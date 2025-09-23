import React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGradientTextProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
    colorFrom?: string;
    colorTo?: string;
}

export const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
    children,
    className,
    speed = 1,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
}) => {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent animate-gradient bg-gradient-to-r",
                className
            )}
            style={{
                backgroundImage: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
                animationDuration: `${speed}s`,
            }}
        >
            {children}
        </span>
    );
};
