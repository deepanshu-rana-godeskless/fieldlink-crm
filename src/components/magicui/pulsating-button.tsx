import React from "react"
import { cn } from "@/lib/utils"

interface PulsatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pulseColor?: string // rgb string, e.g. "30,134,255"
    duration?: string
}

export const PulsatingButton = React.forwardRef<HTMLButtonElement, PulsatingButtonProps>(
    ({ className, children, pulseColor = "30,134,255", duration = "1.5s", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn("magicui-pulsating px-8 py-4 text-lg font-semibold flex flex-row items-center gap-2 min-w-fit whitespace-nowrap", className)}
                style={{
                    '--pulse-color': pulseColor,
                    '--duration': duration,
                } as React.CSSProperties}
                {...props}
            >
                <span className="magicui-content whitespace-nowrap flex flex-row items-center gap-2">{children}</span>
            </button>
        )
    }
)

PulsatingButton.displayName = "PulsatingButton"
