"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FloatingElements from "@/components/FloatingElements";
import MusicPlayer from "@/components/MusicPlayer";

export default function LandingPage() {
  const router = useRouter();
  const [declined, setDeclined] = useState(false);

  const handleYes = () => {
    sessionStorage.setItem("allowed", "true");
    router.push("/tea");
  };

  const handleNo = () => {
    setDeclined(true);
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 20%, #ffe4e6 0%, #fff8f0 40%, #fdf2f8 100%)",
      }}
    >
      <FloatingElements />

      {/* Decorative circles */}
      <div className="fixed top-[-120px] right-[-80px] w-[400px] h-[400px] rounded-full bg-rose-100/50 blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-100px] left-[-60px] w-[350px] h-[350px] rounded-full bg-pink-100/60 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 glass-card glow-border rounded-3xl p-10 md:p-16 max-w-lg w-[92%] mx-auto text-center shadow-xl"
      >
        {/* Heartbeat emoji */}
        <motion.div
          className="text-5xl mb-4"
          animate={{ scale: [1, 1.18, 1, 1.18, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          🌸
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold mb-2 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="shimmer-text">Are you my Hurpori?</span>
        </motion.h1>

        <motion.p
          className="text-rose-400 font-body text-sm mt-1 mb-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Only the right person will know 💌
        </motion.p>

        <AnimatePresence mode="wait">
          {!declined ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(225,29,72,0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-body font-bold text-lg shadow-lg shadow-rose-200 transition-all"
              >
                Yes 💖
              </motion.button>

              <motion.button
                onClick={handleNo}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-3.5 rounded-full border-2 border-rose-300 text-rose-500 font-body font-semibold text-lg bg-white/70 hover:bg-rose-50 transition-all"
              >
                No 😅
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="declined"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="py-4"
            >
              <div className="text-4xl mb-3">🥺</div>
              <p className="font-display italic text-rose-500 text-xl leading-relaxed">
                "Maybe I got the wrong person…
              </p>
              <p className="font-display italic text-rose-400 text-xl leading-relaxed mt-1">
                but you still made me smile 😊"
              </p>
              <motion.button
                onClick={() => setDeclined(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 text-sm text-rose-300 underline underline-offset-2 hover:text-rose-500 transition-colors"
              >
                Wait, are you sure?
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-rose-100">
          <MusicPlayer />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 mt-6 text-rose-300 font-body text-xs tracking-widest"
      >
        made with 💕 just for you
      </motion.p>
    </main>
  );
}
