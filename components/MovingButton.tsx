"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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

      // Only dodge when cursor is close
      if (dist > 120) return;

      // Direction away from cursor
      let dx = btnCenterX - cursorX;
      let dy = btnCenterY - cursorY;

      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;

      // Add randomness
      dx += (Math.random() - 0.5) * 0.8;
      dy += (Math.random() - 0.5) * 0.8;

      const moveDist = 140;

      let newX = pos.x + dx * moveDist;
      let newY = pos.y + dy * moveDist;

      // Clamp inside container
      const maxX = cRect.width / 2 - bRect.width;
      const maxY = cRect.height / 2 - bRect.height;

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
      className="relative w-[320px] h-[200px] flex items-center justify-center"
    >
      <motion.button
        ref={buttonRef}
        animate={{ x: pos.x, y: pos.y }}
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 12,
        }}
        onClick={onFinalClick}
        whileTap={{ scale: 0.9 }}
        className="
          absolute
          px-8 py-3 rounded-full font-semibold
          border-2 border-rose-300 text-rose-400 bg-white/80
          shadow-md cursor-pointer select-none
        "
      >
        {label}
      </motion.button>
    </div>
  );
}