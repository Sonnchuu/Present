import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

/**
 * Helper function to generate random note visuals.
 * Moving this outside the component ensures we don't call impure functions during render.
 */
const generateInitialNotes = () => {
  return Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    rotate: Math.random() * 90 - 45,
    x: Math.random() * 160 - 80,
    y: Math.random() * 80 + 10,
  }));
};

/**
 * Professional LoveJar with a "beating" heart button and shy tooltips.
 */
const LoveJar = ({ onOpenNote }) => {
  // Use lazy state initialization to ensure random notes are only generated once on mount.
  const [notes] = useState(generateInitialNotes);
  const [isHovered, setIsHovered] = useState(false);

  // Sweet messages for the tooltip
  const messages = [
    "Натисни ме! ✨",
    "Отвори ме... 💌",
    "Имам изненада! 💖",
    "Целуни ме? 🌸",
  ];

  const [randomMsg] = useState(
    () => messages[Math.floor(Math.random() * messages.length)],
  );

  return (
    <div
      className="relative flex flex-col items-center justify-center pt-8"
      style={{ isolation: "isolate" }}
    >
      {/* 1. LID SECTION */}
      <div className="relative z-50 flex flex-col items-center translate-y-3">
        <div className="w-[124px] h-2 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-600 rounded-t-md shadow-sm" />
        <div
          className="w-[128px] h-10 bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-600 shadow-md border-y border-yellow-800/20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px), linear-gradient(to right, #a16207, #fde047, #a16207)",
          }}
        />
        <div className="w-[132px] h-3 bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-700 rounded-b-xl shadow-inner" />
      </div>

      {/* 2. BODY SECTION */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative z-30 flex flex-col items-center"
      >
        <div className="w-[115px] h-8 bg-white/30 backdrop-blur-md border-x-2 border-white/40 shadow-inner" />

        <div className="relative w-[280px] h-[340px] -mt-2 bg-white/10 backdrop-blur-3xl border-2 border-white/50 rounded-[80px] rounded-t-[50px] shadow-[0_30px_60px_rgba(0,0,0,0.1),inset_0_0_50px_rgba(255,255,255,0.3)] flex flex-col items-center overflow-hidden">
          <div className="absolute inset-0 rounded-[80px] rounded-t-[45px] shadow-[inset_0_0_35px_rgba(255,255,255,0.4)] pointer-events-none" />

          {/* Reflections */}
          <div className="absolute top-0 left-6 w-8 h-full bg-gradient-to-r from-white/20 to-transparent opacity-40 blur-[2px]" />
          <div className="absolute top-0 right-5 w-3 h-full bg-white/15 opacity-30 blur-[1px]" />

          {/* Notes inside */}
          <div className="absolute inset-0 flex flex-wrap justify-center content-end pb-14 opacity-80 pointer-events-none">
            {notes.map((note) => (
              <div
                key={note.id}
                className="w-10 h-6 bg-note-paper border border-yellow-200/50 shadow-sm rounded-sm"
                style={{
                  transform: `translate(${note.x}px, ${note.y}px) rotate(${note.rotate}deg)`,
                }}
              />
            ))}
          </div>

          {/* Tooltip съобщение */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -70, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 z-[60] bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-rose-100 text-rose-500 font-elegant font-bold text-xl pointer-events-none whitespace-nowrap"
              >
                {randomMsg}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-rose-100" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Beating Heart Button */}
          <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onOpenNote}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.15, 1],
              filter: [
                "drop-shadow(0 0 5px #ff758c)",
                "drop-shadow(0 0 20px #ff758c)",
                "drop-shadow(0 0 5px #ff758c)",
              ],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[45%] -translate-y-1/2 z-50 group cursor-pointer"
          >
            <div className="absolute inset-0 bg-love-pink blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative bg-gradient-to-br from-love-pink to-love-rose p-6 rounded-full shadow-lg border-2 border-white/70">
              <Heart
                className="w-12 h-12 text-white fill-white/20"
                strokeWidth={2.5}
              />
            </div>
          </motion.button>

          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white/20 to-transparent opacity-60" />
        </div>
      </motion.div>

      <div className="w-72 h-8 bg-black/5 blur-3xl rounded-[100%] mt-4" />
    </div>
  );
};

export default LoveJar;
