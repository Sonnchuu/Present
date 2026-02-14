import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Note component that displays the extracted reason with a hand-written aesthetic.
 * @param {Object} props
 * @param {string} props.text - The content of the note
 * @param {boolean} props.isOpen - Whether the note is visible
 * @param {() => void} props.onClose - Function to close the note
 */
const Note = ({ text, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Тъмен дефокусиран фон (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-rose-900/20 backdrop-blur-sm"
          />

          {/* Самата бележка */}
          <motion.div
            initial={{ scale: 0, rotate: -10, y: 100 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0, rotate: 10, y: 100 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative w-full max-w-sm bg-stone-50 p-8 shadow-2xl rounded-sm border-l-4 border-yellow-300"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 98% 100%, 2% 98%)", // Леко накъсани краища
            }}
          >
            {/* Декоративна линийка (като на тетрадка) */}
            <div className="absolute top-0 left-8 bottom-0 w-[1px] bg-red-200" />

            {/* Бутон за затваряне */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Текстът на причината */}
            <div className="relative mt-4">
              <p className="font-handwriting text-3xl text-stone-800 leading-tight">
                {text}
              </p>
            </div>

            {/* Малко "подписче" или сърчице долу вдясно */}
            <div className="mt-8 text-right">
              <span className="text-rose-400 text-2xl">❤️</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Note;
