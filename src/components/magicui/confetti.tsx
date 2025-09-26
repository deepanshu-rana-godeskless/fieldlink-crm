"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export interface ConfettiProps {
  duration?: number; // total duration of confetti in ms
  colors?: string[];
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  zIndex?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({
  duration = 5000,
  colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"],
  particleCount = 2,
  angle = 60,
  spread = 55,
  startVelocity = 60,
  zIndex = 100,
}) => {
  useEffect(() => {
    const end = Date.now() + duration;

    const frame = () => {
      if (Date.now() > end) return;

      // Left side cannon
      confetti({
        particleCount,
        angle,
        spread,
        startVelocity,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      // Right side cannon
      confetti({
        particleCount,
        angle: 180 - angle,
        spread,
        startVelocity,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, [duration, colors, particleCount, angle, spread, startVelocity]);

  return (
    <canvas
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex,
      }}
    />
  );
};
