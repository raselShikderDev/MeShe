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

      // trigger earlier so it never feels clickable
      if (dist > 180) return;

      let dx = btnCenterX - cursorX;
      let dy = btnCenterY - cursorY;

      let len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;

      // 🔥 BOOST horizontal movement
      dx *= 1.8;

      // randomness
      dx += (Math.random() - 0.5) * 0.8;
      dy += (Math.random() - 0.5) * 0.6;

      // normalize again
      len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;

      const moveDist = 40 + Math.random() * 120;

      let newX = pos.x + dx * moveDist;
      let newY = pos.y + dy * moveDist;

      const maxX = cRect.width / 2 - bRect.width;
      const maxY = cRect.height / 2 - bRect.height;

      // 🔥 EDGE ESCAPE (prevents stuck feeling)
      if (Math.abs(newX) >= maxX - 10) {
        newX = -newX * 0.7; // bounce back
      }

      if (Math.abs(newY) >= maxY - 10) {
        newY = -newY * 0.7;
      }

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
      className="relative w-[420px] h-[220px] flex items-center justify-center"
    >
      <motion.button
        ref={buttonRef}
        animate={{ x: pos.x, y: pos.y }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 14,
        }}
        onClick={(e) => {
          e.preventDefault(); // 🔥 prevent accidental click
        }}
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
