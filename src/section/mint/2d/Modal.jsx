import React from "react";
import { motion } from "framer-motion";

export default function Modals({ isOpen, onClose }) {
  return (
    <div
      className={`fixed z-[9999999] inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isOpen ? 0.5 : 0,
          scale: isOpen ? 1 : 0.95,
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { type: "spring", stiffness: 100, damping: 25 },
        }}
      />

      <motion.div
        className="bg-[#320d3f] p-8 rounded-lg shadow-lg max-w-md w-full relative"
        initial={{
          opacity: 0,
          y: 50,
          scale: 0.95,
          rotateX: 10,
          rotateY: 10,
        }}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 50,
          scale: isOpen ? 1 : 0.95,
          rotateX: isOpen ? 0 : 10,
          rotateY: isOpen ? 0 : 10,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 50,
          rotateX: 10,
          rotateY: 10,
        }}
        transition={{
          opacity: { duration: 0.4 },
          y: { type: "spring", stiffness: 100, damping: 25 },
          scale: { type: "spring", stiffness: 300, damping: 25 },
          rotateX: { type: "spring", stiffness: 100, damping: 25 },
          rotateY: { type: "spring", stiffness: 100, damping: 25 },
        }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Lunch Break</h2>
          <p className="text-white">It's time for a break! Enjoy your lunch.</p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
          >
            Close
          </button>
        </div>

        <motion.div
          className="absolute inset-0 border-4 border-white border-opacity-30 rounded-lg animate-pulse"
          style={{
            zIndex: -1,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            transition: {
              opacity: {
                duration: 0.7,
                repeat: Infinity,
                repeatType: "reverse",
              },
            },
          }}
        />
      </motion.div>
    </div>
  );
}
