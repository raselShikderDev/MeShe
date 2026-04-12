"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FloatingElements from "@/components/FloatingElements";
import MovingButton from "@/components/MovingButton";
import RotatingText from "@/components/RotatingText";
import MusicPlayer from "@/components/MusicPlayer";

interface DeviceInfo {
  userAgent: string;
  platform: string;
  language: string;
  screen: { width: number; height: number };
  timezone: string;
  deviceType: string;
}

function collectDeviceInfo(): DeviceInfo {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    deviceType: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop",
  };
}

function requestLocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation not supported");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("📍 Location:", {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });
    },
    (err) => {
      console.log("Location denied:", err.message);
    },
  );
}

export default function TeaPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState<"idle" | "yes" | "no">("idle");
  const [confetti, setConfetti] = useState<number[]>([]);

  useEffect(() => {
    const allowed = sessionStorage.getItem("allowed");
    if (allowed !== "true") {
      router.replace("/");
    } else {
      setChecked(true);
    }
  }, [router]);

  const handleYes = () => {
    const info = collectDeviceInfo();
    console.log("💖 Device Info:", info);
    requestLocation();
    setState("yes");
    // Trigger confetti
    setConfetti(Array.from({ length: 20 }, (_, i) => i));
  };

  const handleNoFinal = () => {
    setState("no");
  };

  if (!checked) return null;

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 80% 10%, #fce7f3 0%, #fff8f0 45%, #ffe4e6 100%)",
      }}
    >
      <FloatingElements />

      {/* Glow blobs */}
      <div className="fixed top-1/4 left-[-100px] w-[380px] h-[380px] rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-[-80px] w-[300px] h-[300px] rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />

      {/* Confetti burst */}
      <AnimatePresence>
        {confetti.length > 0 &&
          confetti.map((i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
              }}
              animate={{
                opacity: 0,
                x: (Math.random() - 0.5) * 600,
                y: (Math.random() - 0.5) * 600,
                scale: 0,
                rotate: Math.random() * 720,
              }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="fixed top-1/2 left-1/2 text-2xl pointer-events-none z-50"
              style={{ willChange: "transform" }}
            >
              {["💖", "🌸", "✨", "💕", "🎉", "🌷", "💫"][i % 7]}
            </motion.div>
          ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 glass-card glow-border rounded-3xl p-8 md:p-14 max-w-lg w-[92%] mx-auto text-center shadow-xl"
      >
        {/* Cup emoji heartbeat */}
        <motion.div
          className="text-5xl mb-4"
          animate={
            state === "yes"
              ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }
              : { scale: [1, 1.12, 1] }
          }
          transition={{
            repeat: state === "yes" ? 0 : Infinity,
            duration: state === "yes" ? 0.6 : 2.5,
          }}
        >
          {state === "yes" ? "💖" : state === "no" ? "😄" : "☕"}
        </motion.div>

        <AnimatePresence mode="wait">
          {state === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-2">
                <span className="shimmer-text">
                  Will you have a cup of tea with me?
                </span>
              </h1>
              <p className="text-rose-300 text-sm font-body mb-1">
                ☕ Just the two of us 🌸
              </p>

              {/* Rotating romantic lines */}
              <div className="my-6">
                <RotatingText />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
                <motion.button
                  onClick={handleYes}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 10px 40px rgba(225,29,72,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-body font-bold text-lg shadow-lg shadow-rose-200"
                >
                  YES 💖
                </motion.button>

                <MovingButton
                  onFinalClick={handleNoFinal}
                  label="No 😅"
                />
              </div>
            </motion.div>
          )}

          {state === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                🎉
              </motion.div>
              <h2 className="font-display text-3xl font-bold text-rose-600 mb-3">
                You just made my day 😊
              </h2>
              <p className="text-rose-400 font-body text-base mb-6">
                I'll put the kettle on right now… ☕💕
              </p>

              {/* Device info display (cute) */}
              <div className="bg-rose-50/80 rounded-2xl p-4 text-left text-xs text-rose-400 font-body space-y-1 border border-rose-100 mb-6">
                <p className="text-rose-500 font-semibold text-sm mb-2">
                  ✨ A little note:
                </p>
                <p>
                  You're joining from{" "}
                  <span className="text-rose-600 font-semibold">
                    {typeof window !== "undefined"
                      ? /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
                        ? "your phone 📱"
                        : "your computer 💻"
                      : "your device"}
                  </span>
                </p>
                <p>
                  Timezone:{" "}
                  <span className="text-rose-600 font-semibold">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </span>
                </p>
                <p>
                  Language:{" "}
                  <span className="text-rose-600 font-semibold">
                    {typeof navigator !== "undefined"
                      ? navigator.language
                      : "—"}
                  </span>
                </p>
              </div>

              {/* Contact section */}
              <div className="border-t border-rose-100 pt-5 space-y-3">
                <p className="text-rose-400 text-sm font-body">
                  Find me here 💌
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <motion.a
                    href="mailto:youremail@example.com"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-rose-200 text-rose-500 font-body text-sm font-semibold shadow-sm hover:bg-rose-50 transition-colors"
                  >
                    ✉️ Email me
                  </motion.a>
                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-500 font-body text-sm font-semibold shadow-sm hover:bg-blue-100 transition-colors"
                  >
                    👤 Facebook
                  </motion.a>
                </div>
                <div className="mt-3">
                  <MusicPlayer />
                </div>
              </div>
            </motion.div>
          )}

          {state === "no" && (
            <motion.div
              key="no"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-5xl mb-4">😄</div>
              <h2 className="font-display text-2xl font-bold text-rose-500 mb-3">
                Okay okay 😄
              </h2>
              <p className="text-rose-400 font-body text-base mb-4">
                I'll try again another day… 🌷
              </p>
              <motion.button
                onClick={() => setState("idle")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 text-sm text-rose-400 underline underline-offset-2 hover:text-rose-600 transition-colors"
              >
                Wait, actually… 👀
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Back link */}
      <motion.button
        onClick={() => router.push("/")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-5 text-rose-300 font-body text-xs hover:text-rose-500 transition-colors underline underline-offset-2"
      >
        ← Go back
      </motion.button>
    </main>
  );
}
