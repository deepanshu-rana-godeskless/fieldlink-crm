// Official shadcn/ui Avatar component
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> { }

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
                    className
                )}
                data-slot="avatar"
                {...props}
            />
        );
    }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
    HTMLImageElement,
    React.ImgHTMLAttributes<HTMLImageElement>
>(({
    className,
    ...props
}, ref) => {
    return (
        <img
            ref={ref}
            className={cn("aspect-square h-full w-full", className)}
            data-slot="avatar-image"
            {...props}
        />
    );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({
    className,
    ...props
}, ref) => {
    return (
        <span
            ref={ref}
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground",
                className
            )}
            data-slot="avatar-fallback"
            {...props}
        />
    );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
