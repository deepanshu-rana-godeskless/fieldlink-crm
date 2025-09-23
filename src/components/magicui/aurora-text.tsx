import React from "react";

export interface AuroraTextProps {
    children: React.ReactNode;
    className?: string;
    colors?: string[];
    speed?: number;
}

export const AuroraText: React.FC<AuroraTextProps> = ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1,
}) => {
    return (
        <span
            className={
                `aurora-text ${className}`
            }
            style={{
                background: `linear-gradient(90deg, ${colors.join(",")})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                animation: `aurora-move ${2 / speed}s linear infinite`,
                backgroundSize: "200% 100%",
            }}
        >
            {children}
        </span>
    );
};
