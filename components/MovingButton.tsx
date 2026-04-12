"use client";
import { useRef, useState } from "react";

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
  const lastMove = useRef(0);

  const dodge = () => {
    const now = Date.now();

    // 🔥 simple cooldown (prevents spam)
    if (now - lastMove.current < 200) return;
    lastMove.current = now;

    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const cRect = container.getBoundingClientRect();
    const bRect = button.getBoundingClientRect();

    const maxX = cRect.width / 2 - bRect.width;
    const maxY = cRect.height / 2 - bRect.height;

    // 🔥 RANDOM POSITION (big jump, not drift)
    const newX = (Math.random() * 2 - 1) * maxX;
    const newY = (Math.random() * 2 - 1) * maxY;

    setPos({ x: newX, y: newY });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[450px] h-[250px] flex items-center justify-center"
    >
      <button
        ref={buttonRef}
        onMouseEnter={dodge}
        onClick={(e) => e.preventDefault()}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
        className="
          absolute
          px-8 py-3 rounded-full font-semibold
          border-2 border-rose-300 text-rose-400 bg-white/90
          shadow-md cursor-pointer select-none
          transition-transform duration-150
        "
      >
        {label}
      </button>
    </div>
  );
}