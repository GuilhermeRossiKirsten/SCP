"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface SystemInvasionProps {
  onComplete: () => void;
}

export function SystemInvasion({ onComplete }: SystemInvasionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current; // Copia a ref para variável local
    if (!container) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // Grid
    const gridHelper = new THREE.GridHelper(50, 50, 0x6366f1, 0x4c1d95);
    gridHelper.position.y = -10;
    scene.add(gridHelper);

    // Linhas de conexão
    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions: number[] = [];
    for (let i = 0; i < 100; i++) {
      linesPositions.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
      );
    }
    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linesPositions, 3),
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    camera.position.z = 30;

    // Interação do mouse
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animação
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      lines.rotation.y += 0.002;

      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Terminal text animation
    const messages = [
      "Inicializando protocolo de segurança...",
      "Bypassing firewall...",
      "Descriptografando dados...",
      "Acesso concedido ✔",
    ];

    let messageIndex = 0;
    const typeMessage = () => {
      if (messageIndex < messages.length) {
        setTerminalText((prev) => [...prev, messages[messageIndex]]);
        messageIndex++;
        setTimeout(typeMessage, 800);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 500);
        }, 500);
      }
    };
    setTimeout(typeMessage, 500);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (container) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black"
        >
          <div ref={containerRef} className="absolute inset-0" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-2xl px-4">
              <div className="bg-black/80 border border-cyan-500/30 rounded-lg p-6 font-mono">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-cyan-400 text-sm">
                    system@invasion:~$
                  </span>
                </div>

                <div className="space-y-2">
                  {terminalText.map((text, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-green-400 text-sm"
                    >
                      <span className="text-cyan-400">{">"}</span> {text}
                    </motion.div>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    className="inline-block w-2 h-4 bg-green-400 ml-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
