import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Music2 } from "lucide-react";

/**
 * MusicPlayer component that plays a soft romantic background piano track.
 * Features a floating toggle button with rotating animation when active.
 */
const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize audio with a stable direct link
    const audio = new Audio(
      "https://cdn.pixabay.com/audio/2022/11/22/audio_1e3703598c.mp3",
    );
    audio.loop = true;
    audio.volume = 0.2;
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    // Pre-load
    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/40 shadow-lg text-rose-500 hover:bg-white/40 transition-all focus:outline-none"
      aria-label={isPlaying ? "Pause Music" : "Play Music"}
    >
      {isPlaying ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Music2 size={24} />
        </motion.div>
      ) : (
        <div className="relative">
          <Music size={24} className="opacity-60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 bg-rose-500/50 rotate-45" />
        </div>
      )}
    </motion.button>
  );
};

export default MusicPlayer;
