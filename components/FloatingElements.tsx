"use client";
import { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  emoji: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
  top: string;
}

const EMOJIS = ["👶", "🌸", "💕", "🌷", "✨", "🍀", "💖", "🌼", "🦋", "🌹"];

export default function FloatingElements() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generated: FloatingItem[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[i % EMOJIS.length],
      left: `${Math.random() * 95}%`,
      top: `${Math.random() * 90}%`,
      size: `${1.2 + Math.random() * 1.6}rem`,
      duration: `${4 + Math.random() * 5}s`,
      delay: `${Math.random() * 4}s`,
    }));
    setItems(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Petal rain */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`petal-${i}`}
          className="petal"
          style={{
            left: `${(i * 8.5) % 100}%`,
            animationDuration: `${6 + (i % 5)}s`,
            animationDelay: `${i * 0.8}s`,
            fontSize: `${1 + (i % 3) * 0.4}rem`,
          }}
        >
          {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "🌷" : "🌹"}
        </div>
      ))}

      {/* Floating baby + hearts */}
      {items.map((item) => (
        <div
          key={item.id}
          className="baby-float absolute select-none"
          style={{
            left: item.left,
            top: item.top,
            fontSize: item.size,
            animationDuration: item.duration,
            animationDelay: item.delay,
            opacity: 0.55,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}
