import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Background from "./components/Background";
import LoveJar from "./components/LoveJar";
import Note from "./components/Note";
import FloatingHearts from "./components/FloatingHearts";
import { reasons } from "./data/reasons";

function App() {
  const [currentNote, setCurrentNote] = useState("");
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [openedCount, setOpenedCount] = useState(0);

  // Sound effects
  const playPop = () => {
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3",
    );
    audio.volume = 0.05;
    audio.play().catch(() => {});
  };

  const handleOpenNote = () => {
    playPop();
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setCurrentNote(reasons[randomIndex]);
    setIsNoteOpen(true);
    setOpenedCount((prev) => Math.min(prev + 1, 100));

    // Heart Confetti Magic
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#ff758c", "#ffced6", "#ffffff"],
    };
    confetti({
      ...defaults,
      particleCount: 50,
      scalar: 2,
      shapes: ["circle"],
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-10 overflow-hidden bg-rose-50/50">
      <Background />
      <FloatingHearts />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center z-10"
      >
        <div className="flex items-center justify-center gap-4 mb-2">
          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-pink-400 text-3xl md:text-4xl pointer-events-none"
          >
            ✨
          </motion.span>

          <motion.h1
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-8xl text-center bg-gradient-to-r from-rose-500 via-love-pink to-rose-500 bg-clip-text text-transparent sparkle-text tracking-wide leading-tight px-4 font-title select-none"
          >
            100 причини защо те обичам
          </motion.h1>

          <motion.span
            animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            className="text-pink-400 text-3xl md:text-4xl pointer-events-none"
          >
            ✨
          </motion.span>
        </div>

        {/* Glass Underline and Counter Decor */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "240px" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[1.5px] bg-gradient-to-r from-transparent via-rose-300 to-transparent shadow-[0_0_8px_white]"
          />
          <div className="mt-4 px-8 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 text-rose-500 font-title text-3xl shadow-sm tracking-wide">
            Открити причини:{" "}
            <span className="text-love-pink font-bold mx-1">{openedCount}</span>{" "}
            <span className="opacity-60 text-xl">/ 100</span> ✨
          </div>
        </div>
      </motion.div>

      <LoveJar onOpenNote={handleOpenNote} />

      <Note
        text={currentNote}
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
      />

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-8 text-rose-400 font-elegant text-xl italic cursor-default select-none"
      >
        Докосни сърцето...
      </motion.p>
    </div>
  );
}

export default App;
