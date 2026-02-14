import { motion } from "framer-motion";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FFF5F7]">
      {/* Петно 1 - Розово (Интензивно) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-[120px] will-change-transform pointer-events-none"
      />

      {/* Петно 2 - Лилаво/Синкаво (Интензивно) */}
      <motion.div
        animate={{
          x: [0, -70, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[120px] will-change-transform pointer-events-none"
      />

      {/* Петно 3 - Топло жълто (за да свети буркана отзад) */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-100/50 rounded-full blur-[80px] will-change-transform pointer-events-none"
      />
    </div>
  );
};

export default Background;
