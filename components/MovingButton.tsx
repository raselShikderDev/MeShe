"use client";
import { useRef, useState, useEffect } from "react";

interface MovingButtonProps {
  onFinalClick: () => void;
  label?: string;
}

export default function MovingButton({
  onFinalClick,
  label = "No 😅",
}: MovingButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      const button = buttonRef.current;
      if (!container || !button) return;

      const cRect = container.getBoundingClientRect();
      const bRect = button.getBoundingClientRect();

      const cursorX = e.clientX;
      const cursorY = e.clientY;

      const btnCenterX = bRect.left + bRect.width / 2;
      const btnCenterY = bRect.top + bRect.height / 2;

      const dist = Math.hypot(cursorX - btnCenterX, cursorY - btnCenterY);

      // trigger earlier → harder to click
      if (dist > 200) return;

      let dx = btnCenterX - cursorX;
      let dy = btnCenterY - cursorY;

      let len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;

      // 🔥 boost horizontal movement
      dx *= 2;

      // randomness
      dx += (Math.random() - 0.5) * 0.8;
      dy += (Math.random() - 0.5) * 0.6;

      // normalize again
      len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;

      const moveDist = 50 + Math.random() * 120;

      let newX = pos.x + dx * moveDist;
      let newY = pos.y + dy * moveDist;

      const maxX = cRect.width / 2 - bRect.width;
      const maxY = cRect.height / 2 - bRect.height;

      // bounce from edges
      if (Math.abs(newX) >= maxX - 5) newX = -newX * 0.7;
      if (Math.abs(newY) >= maxY - 5) newY = -newY * 0.7;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      setPos({ x: newX, y: newY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pos]);

  return (
    <div
      ref={containerRef}
      className="relative w-[450px] h-[250px] flex items-center justify-center"
    >
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.preventDefault(); // prevent accidental click
        }}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
        className="
          absolute
          px-8 py-3 rounded-full font-semibold
          border-2 border-rose-300 text-rose-400 bg-white/90
          shadow-md cursor-pointer select-none
          transition-transform duration-75
        "
      >
        {label}
      </button>
    </div>
  );
}
