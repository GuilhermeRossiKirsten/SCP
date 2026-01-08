"use client";

import { useEffect, useState } from "react";
import { SystemInvasion } from "./system-invasion";

export function KonamiCode() {
  const [showSystemInvasion, setShowSystemInvasion] = useState(false);

  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setShowSystemInvasion(true);
          konamiIndex = 0; // Reset the sequence
        }
      } else {
        konamiIndex = 0; // Reset if sequence breaks
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {showSystemInvasion && (
        <SystemInvasion onComplete={() => setShowSystemInvasion(false)} />
      )}
    </>
  );
}
