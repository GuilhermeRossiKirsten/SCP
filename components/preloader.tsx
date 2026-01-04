"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete: () => void;
  duration?: number;
}

export function Preloader({ onComplete, duration = 2500 }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Anima o progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    // Timer para completar
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 50px,
                  rgba(200, 245, 80, 0.05) 50px,
                  rgba(200, 245, 80, 0.05) 51px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 50px,
                  rgba(200, 245, 80, 0.05) 50px,
                  rgba(200, 245, 80, 0.05) 51px
                )`,
              }}
            />
          </div>

          {/* Logo/Nome */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            {/* Iniciais grandes */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-brier text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold text-lorenzo-accent tracking-tighter leading-none block"
            >
              GRK
            </motion.span>

            {/* Nome completo */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lorenzo-light/60 text-xs md:text-sm tracking-[0.3em] uppercase mt-2 block"
            >
              Guilherme Rossi Kirsten
            </motion.span>
          </motion.div>

          {/* Progress Bar minimalista */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "200px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
          >
            <div className="w-[200px] h-[2px] bg-lorenzo-light/10 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-lorenzo-accent shadow-[0_0_10px_rgba(200,245,80,0.5)]"
                transition={{ duration: 0.1 }}
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lorenzo-light/40 text-[10px] tracking-widest uppercase mt-3 block text-center font-mono"
            >
              {progress}%
            </motion.span>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute top-8 right-8 text-lorenzo-accent text-[10px] tracking-widest uppercase font-mono"
          >
            LOADING
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-8 left-8 text-lorenzo-light/40 text-[10px] tracking-widest uppercase font-mono"
          >
            DEV / SECOPS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
