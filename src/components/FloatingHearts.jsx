import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const randomX = Math.random() * 240 - 120;
      const randomRotate = Math.random() * 360;

      setHearts((prev) => [...prev, { id, x: randomX, rotate: randomRotate }]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 2500);
    }, 800); // По-често излитане
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          initial={{ y: "55vh", opacity: 0, x: "50vw", scale: 0 }}
          animate={{
            y: "10vh",
            opacity: [0, 1, 1, 0],
            x: `calc(50vw + ${heart.x}px)`,
            rotate: heart.rotate,
            scale: [0.5, 1, 1, 0.8],
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute text-2xl"
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingHearts;
