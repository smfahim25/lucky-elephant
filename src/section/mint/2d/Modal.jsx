"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Modals({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed z-[9999999] inset-0 flex justify-center items-center">
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={onClose}
          />

          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-purple-500 opacity-70"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 2 + 0.5,
                  opacity: Math.random() * 0.7,
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-[#320d3f] to-[#4a1760] p-8 rounded-lg shadow-2xl max-w-md w-full relative z-10 overflow-hidden"
            initial={{
              opacity: 0,
              y: 100,
              scale: 0.6,
              rotateX: 30,
              rotateY: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
              y: 100,
              rotateX: -30,
              rotateY: 20,
              transition: { duration: 0.5 },
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              duration: 0.8,
            }}
          >
            <motion.div
              className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-lg opacity-30 blur-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.5, 0.3],
                scale: [0.8, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                times: [0, 0.5, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute inset-0 border-2 border-white border-opacity-30 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.9, 1.01, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <div className="text-center relative z-10">
              <motion.h2
                className="text-2xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Lunch Break
              </motion.h2>

              <motion.p
                className="text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                It's time for a break! Enjoy your lunch.
              </motion.p>

              <motion.button
                onClick={onClose}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full hover:from-red-600 hover:to-pink-700 transition-all shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.7,
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255,100,150,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>

            <motion.div
              className="absolute top-0 right-0 w-20 h-20 rounded-full bg-purple-500 opacity-20 blur-xl"
              initial={{ scale: 0, x: 20, y: -20 }}
              animate={{ scale: 1, x: 0, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-pink-500 opacity-20 blur-xl"
              initial={{ scale: 0, x: -20, y: 20 }}
              animate={{ scale: 1, x: 0, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
