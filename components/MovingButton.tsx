"use client";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface MovingButtonProps {
  onFinalClick: () => void;
  label?: string;
  maxMoves?: number;
}

export default function MovingButton({
  onFinalClick,
  label = "No 😅",
  maxMoves = 1000000,
}: MovingButtonProps) {
  const [moves, setMoves] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dodge = useCallback(() => {
    if (moves >= maxMoves) {
      setDone(true);
      return;
    }

    const range = 80;
    const dx = (Math.random() - 1) * range * 3;
    const dy = (Math.random() - 1) * range * 3;

    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setMoves((m) => m + 1);
  }, [moves, maxMoves]);

  const handleClick = () => {
    if (done) {
      onFinalClick();
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <motion.button
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onHoverStart={!done ? dodge : undefined}
        onTouchStart={!done ? dodge : undefined}
        onClick={handleClick}
        whileHover={done ? { scale: 1.05 } : {}}
        whileTap={{ scale: 0.95 }}
        className={`
          px-8 py-3 rounded-full font-body font-semibold text-base
          border-2 transition-colors duration-200 select-none
          ${done
            ? "border-rose-400 text-rose-500 bg-white hover:bg-rose-50 cursor-pointer"
            : "border-rose-300 text-rose-400 bg-white/70 cursor-default"
          }
        `}
      >
        {label}
        {!done && moves > 0 && (
          <span className="ml-2 text-xs text-rose-300">
           
          </span>
        )}
      </motion.button>
    </div>
  );
}
