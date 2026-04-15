"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "You're the reason I smile without knowing why 🌸",
  "In a room full of people, I'd still find you ✨",
  "You make ordinary moments feel magical 💫",
  "My heart does something silly when I think of you 💕",
  "You're my favourite kind of distraction 🦋",
  "I like you more than I planned to 🌷",
  "You're the plot twist I didn't see coming 📖",
  "My favourite place is next to you 🏡",
  "You make me want to be a morning person ☀️",
  "I'd share my last snack with you 🍪",
  "You're the song stuck in my head today 🎵",
  "Seeing you is my favourite part of any day 🌼",
  "You make my heart do backflips 🎪",
  "I like how you exist 💖",
  "You're my kind of wonderful 🌹",
  "Every love song makes sense because of you 🎶",
  "You make the world prettier just by being in it 🌍",
  "I'd walk in the rain just to hold your hand ☔",
  "You're the warmth in every cold day ☕",
  "My brain can't stop collecting memories of you 📷",
  "You make silence feel comfortable 🕊️",
  "I smile more when I know I'll see you soon 😊",
  "You're my favourite notification 📱",
  "I'd choose you in every universe 🌌",
  "You're the answer to questions I didn't know I had 💌",
  "You make me forget what I was worrying about 🌈",
  "I like every version of you 🎭",
  "You have a laugh that fixes things 😄",
  "You're my favourite 'what if' that actually happened ✨",
  "I think you hung a few of the stars 🌟",
  "You're embarrassingly important to me 🙈",
  "I reread your messages more than I'd admit 💬",
  "You make me care about things I never cared about 🌿",
  "Your name is my happy place 🏠",
  "I like you a little bit more than a lot 💝",
  "You make me want to write poems again 📝",
  "You're the good kind of unexpected 🎁",
  "I laugh more because of you 😂",
  "You're the person I want to tell things to 📢",
  "Everything is better when you're nearby 🌤️",
  "You make waiting feel worth it ⏳",
  "I'd pick you in any timeline 🕰️",
  "You're my favourite human 🧡",
  "You somehow make Mondays better 📅",
  "I'm a little bit in love with how you think 💭",
  "You feel like coming home 🏠",
  "I like the way your eyes crinkle when you smile 👀",
  "You make hope feel reasonable 🌱",
  "You're the best chapter so far 📚",
  "I'm glad you exist, and especially that I found you 🍀",
  "You're the one I want to annoy for a very long time 😄",
  "My coffee tastes better thinking of you ☕",
  "You're the good kind of chaos 🌀",
  "I keep finding new things to like about you 🔍",
  "You make me brave 🦁",
  "I like who I am when I'm with you 🪞",
  "You're the hug I always needed 🤗",
  "You feel like the weekend 🎉",
  "My heart saves a seat for you 💺",
  "You make me want to be better 🌠",
  "You're my emergency person 🚨",
  "I notice you noticing things 👁️",
  "You're the calm in my storm 🌊",
  "I could listen to you talk forever 🎙️",
  "You make me feel seen in the best way 🪄",
  "You're my favourite story 📖",
  "I pick you, every single time 🎯",
  "You make ordinary feel extraordinary ✨",
  "You're what I think about when music plays 🎼",
  "I'd be lost without your specific kind of light 💡",
  "You're irreplaceable, just so you know 🔒",
  "I love how deeply you care about things 💞",
  "You make me want to slow down and enjoy things 🌅",
  "You're my favourite subject to think about 🎓",
  "I find comfort in your existence 🕊️",
  "You're everything I didn't know to ask for 🙏",
  "You have the most beautiful kind of soul 🌟",
  "I'd write a thousand letters just for you ✉️",
  "You make love feel easy 💑",
  "You're the reason the sky looks prettier today 🌤️",
  "I'm so glad you're real and in my life 🌏",
  "You're my biggest yes 🙌",
  "I like you with my whole chest ❤️",
  "You're the sweetest disruption in my routine 🌷",
  "I don't want to imagine a day without you 🧩",
  "You're my favourite kind of miracle 🌠",
  "Everything feels lighter when you're smiling 😊",
  "You matter more than you probably realize 💎",
  "I'd save your seat in every life 🎟️",
  "You're the loveliest thing that happened to me 🌺",
  "My heart knows your name by heart 💗",
  "You're my reason to look forward to tomorrow 🌅",
  "I think you're a little bit magic ✨",
  "You're the thought that makes me smile mid-sentence 🙂",
  "I keep falling for you in slow motion 🍂",
  "You're the missing puzzle piece I didn't notice was gone 🧩",
  "You make my whole life feel like a love song 🎵",
  "I am so, so glad you're you 💖",
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % LINES.length);
    }, 10000);
  }, []);

  useEffect(() => {
    start();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [start]);

  const handlePause = () => {
    setPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleResume = () => {
    setPaused(false);
    start();
  };

  return (
    <div
      className="relative min-h-[80px] flex items-center justify-center cursor-pointer"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="text-center text-rose-600 font-display italic text-lg md:text-xl px-4 leading-relaxed"
        >
          {LINES[index]}
        </motion.p>
      </AnimatePresence>
      {paused && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -bottom-5 right-2 text-xs text-rose-300"
        >
          paused
        </motion.span>
      )}
    </div>
  );
}
