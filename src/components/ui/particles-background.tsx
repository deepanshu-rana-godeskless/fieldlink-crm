"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Particles as MagicParticles } from "@/registry/magicui/particles"

export function ParticlesBackground({ className = "absolute inset-0 z-0", quantity = 100, ease = 80, ...props }) {
    const { resolvedTheme } = useTheme()
    const [color, setColor] = useState("#ffffff")
    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000")
    }, [resolvedTheme])
    return (
        <MagicParticles
            className={className}
            quantity={quantity}
            ease={ease}
            color={color}
            refresh
            {...props}
        />
    )
}
