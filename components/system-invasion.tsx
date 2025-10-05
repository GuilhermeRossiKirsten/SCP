"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_DURATION = {
  INITIAL_DELAY: 1000,
  MESSAGE_DELAY: 1000,
  SCAN_PROGRESS_SPEED: 60,
  POST_SCAN_DELAY: 500,
  ACCESS_GRANTED_DISPLAY: 3000,
  FINAL_TRANSITION: 1000,
};

interface SystemInvasionProps {
  onComplete: () => void;
}

export function SystemInvasion({ onComplete }: SystemInvasionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showingScanLine, setShowingScanLine] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;
    let animationId: number;

    // === Cena e renderizador ===
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

    // === Partículas ===
    const particlesCount = 8000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 120;
      posArray[i + 1] = (Math.random() - 0.5) * 120;
      posArray[i + 2] = (Math.random() - 0.5) * 120;

      colorArray[i] = 0.0 + Math.random() * 0.3;
      colorArray[i + 1] = 0.8 + Math.random() * 0.2;
      colorArray[i + 2] = 0.2 + Math.random() * 0.3;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);

    // === Linhas e grade ===
    const gridHelper = new THREE.GridHelper(60, 60, 0x10b981, 0x065f46);
    gridHelper.position.y = -15;
    scene.add(gridHelper);

    const linesPositions: number[] = [];
    const linesColors: number[] = [];

    for (let i = 0; i < 200; i++) {
      for (let j = 0; j < 6; j++) {
        linesPositions.push((Math.random() - 0.5) * 80);
      }
      const g = 0.5 + Math.random() * 0.5;
      for (let j = 0; j < 6; j += 3) linesColors.push(0.1, g, 0.3);
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linesPositions, 3),
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(linesColors, 3),
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // === Luz e câmera ===
    const light = new THREE.PointLight(0x10b981, 2, 100);
    light.position.set(0, 0, 20);
    scene.add(light);
    camera.position.z = 40;

    // === Interação ===
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = () => {
      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.8,
        }),
      );
      pulse.position.set(mouseX * 20, mouseY * 20, 0);
      scene.add(pulse);

      const expandPulse = () => {
        if (!mounted) return;
        pulse.scale.x += 0.5;
        pulse.scale.y += 0.5;
        pulse.scale.z += 0.5;
        (pulse.material as THREE.MeshBasicMaterial).opacity -= 0.02;

        if ((pulse.material as THREE.MeshBasicMaterial).opacity > 0) {
          requestAnimationFrame(expandPulse);
        } else {
          scene.remove(pulse);
        }
      };
      expandPulse();
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    // === Animação ===
    let time = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      particlesMesh.rotation.y += 0.0015;
      particlesMesh.rotation.x += 0.0008;
      lines.rotation.y += 0.003;
      lines.rotation.x += 0.001;

      light.intensity = 2 + Math.sin(time * 2) * 0.5;

      camera.position.x += (mouseX * 8 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 8 - camera.position.y) * 0.03;
      camera.rotation.x += (mouseY * 0.3 - camera.rotation.x) * 0.05;
      camera.rotation.y += (mouseX * 0.3 - camera.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // === Terminal ===
    const messages = [
      "> Initializing security protocol...",
      "SCAN_PROGRESS",
      "> Decrypting RSA-4096 encryption...",
      "> Establishing secure channel...",
      "> Bypassing authentication...",
      "> Connection established ✓",
      "> ACCESS GRANTED",
    ];

    let messageIndex = 0;
    const typeMessage = () => {
      if (!mounted) return;

      if (messageIndex < messages.length) {
        const current = messages[messageIndex];

        if (current === "SCAN_PROGRESS") {
          setTerminalText((prev) => [...prev, "> Scanning firewall layers..."]);
          setShowingScanLine(true);

          let progress = 0;
          const interval = setInterval(() => {
            if (!mounted) {
              clearInterval(interval);
              return;
            }

            progress += 2;
            setScanProgress(progress);

            if (progress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                if (!mounted) return;
                setShowingScanLine(false);
                messageIndex++;
                setTimeout(typeMessage, LOADING_DURATION.MESSAGE_DELAY);
              }, LOADING_DURATION.POST_SCAN_DELAY);
            }
          }, LOADING_DURATION.SCAN_PROGRESS_SPEED);
        } else {
          setTerminalText((prev) => [...prev, current]);
          messageIndex++;

          if (messageIndex === messages.length) {
            setTimeout(() => {
              if (!mounted) return;
              setShowAccessGranted(true);
              setTimeout(() => {
                if (!mounted) return;
                setIsComplete(true);
                setTimeout(onComplete, LOADING_DURATION.FINAL_TRANSITION);
              }, LOADING_DURATION.ACCESS_GRANTED_DISPLAY);
            }, LOADING_DURATION.MESSAGE_DELAY);
          } else {
            setTimeout(typeMessage, LOADING_DURATION.MESSAGE_DELAY);
          }
        }
      }
    };

    setTimeout(typeMessage, LOADING_DURATION.INITIAL_DELAY);

    // === Cleanup ===
    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);

      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-black"
        >
          <div ref={containerRef} className="absolute inset-0" />

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full max-w-3xl px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/90 border-2 border-green-500/50 rounded-xl p-8 font-mono shadow-2xl shadow-green-500/20 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-green-500/30">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="ml-3 text-green-400 text-sm font-bold">
                    root@secdevops:~#
                  </span>
                </div>

                <div className="space-y-3 min-h-[200px]">
                  {terminalText.map((text, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-green-400 text-sm leading-relaxed"
                    >
                      {text}
                    </motion.div>
                  ))}

                  {showingScanLine && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden border border-green-500/30">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-600 to-green-400"
                            style={{ width: `${scanProgress}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>
                        <span className="text-green-400 text-sm font-bold min-w-[3rem] text-right">
                          {scanProgress}%
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {!showAccessGranted && !showingScanLine && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      className="inline-block w-2 h-5 bg-green-400 ml-1"
                    />
                  )}
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={onComplete}
                className="mt-6 text-green-400 text-sm hover:text-green-300 transition-colors pointer-events-auto flex items-center gap-2 mx-auto"
              >
                <span>Pular animação</span>
                <span className="text-lg">→</span>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {showAccessGranted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-7xl font-bold text-green-400 mb-4 tracking-wider"
                    style={{ textShadow: "0 0 30px rgba(16, 185, 129, 0.8)" }}
                  >
                    ACCESS GRANTED
                  </motion.h1>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
