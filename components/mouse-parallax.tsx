"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function MouseParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { stiffness: 150, damping: 20 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate offset from center (-1 to 1)
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      setMousePosition({ x: offsetX, y: offsetY });
      x.set(offsetX * 20);
      y.set(offsetY * 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <>
      {/* Floating orbs that follow mouse */}
      <motion.div
        className="pointer-events-none fixed left-1/4 top-1/4 z-10 h-64 w-64 rounded-full bg-green-500/5 blur-3xl"
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed right-1/4 top-1/3 z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-3xl"
        style={{
          x: useSpring(mousePosition.x * -30, springConfig),
          y: useSpring(mousePosition.y * -30, springConfig),
        }}
      />
      <motion.div
        className="pointer-events-none fixed bottom-1/4 left-1/3 z-10 h-80 w-80 rounded-full bg-green-600/5 blur-3xl"
        style={{
          x: useSpring(mousePosition.x * 15, springConfig),
          y: useSpring(mousePosition.y * 15, springConfig),
        }}
      />
    </>
  );
}
