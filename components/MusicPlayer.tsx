"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Uses a free royalty-free melody via a data URL (simple tone sequence)
// In production, replace MUSIC_URL with your own audio file in /public
const MUSIC_URL =
  "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.18;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setReady(true));
    audio.load();

    // Show hint after 2s
    const t = setTimeout(() => setShowHint(true), 2000);
    return () => {
      audio.pause();
      audio.src = "";
      clearTimeout(t);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
      setShowHint(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showHint && !playing && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-rose-400 bg-white/80 px-3 py-1 rounded-full border border-rose-200 shadow-sm"
          >
            🎵 Play some music?
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className={`
          flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body font-semibold
          border transition-all duration-300 shadow-sm
          ${playing
            ? "bg-rose-500 text-white border-rose-500 shadow-rose-200 shadow-md"
            : "bg-white text-rose-500 border-rose-300 hover:border-rose-400"
          }
        `}
        title={playing ? "Pause music" : "Play something for you"}
      >
        <motion.span
          animate={playing ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {playing ? "🎵" : "🎶"}
        </motion.span>
        {playing ? "Now Playing…" : "Play something for you 🎶"}
      </motion.button>
    </div>
  );
}
