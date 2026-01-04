"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, BookOpen } from "lucide-react";
import Link from "next/link";

const roles = [
  "C++ Developer",
  "Security Enthusiast",
  "DevOps Engineer",
  "Fullstack Dev",
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transforms baseados no scroll
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const y = useTransform(smoothProgress, [0, 0.5], ["0%", "20%"]);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      data-theme="dark"
      className="relative min-h-[200vh] bg-[#0a0a0a]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(200, 245, 80, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200, 245, 80, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          style={{ scale, opacity, y }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12"
        >
          {/* Tag superior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-lorenzo-accent text-xs md:text-sm tracking-[0.3em] uppercase font-bold">
              Desenvolvedor Fullstack & SecDevOps
            </span>
          </motion.div>

          {/* Nome Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <span className="block text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-lorenzo-light uppercase tracking-tighter leading-none">
              Guilherme
            </span>
            <span className="block text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-lorenzo-accent uppercase tracking-tighter leading-none font-brier">
              Rossi
            </span>
            <span className="block text-[12vw] md:text-[10vw] lg:text-[8vw] font-black text-lorenzo-light uppercase tracking-tighter leading-none">
              Kirsten
            </span>
          </motion.h1>

          {/* Role Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 h-8 overflow-hidden"
          >
            <motion.div
              key={currentRole}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lorenzo-light/70 text-lg md:text-xl tracking-widest uppercase"
            >
              {roles[currentRole]}
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-4 mt-12"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/GuilhermeRossiKirsten",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/guilhermerossikirsten/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:guirossik10@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-lorenzo-light/10 hover:bg-lorenzo-accent hover:text-black flex items-center justify-center text-lorenzo-light transition-colors duration-300"
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.button
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-lorenzo-accent text-lorenzo-dark font-black uppercase px-8 py-4 text-sm tracking-wider hover:bg-lorenzo-light hover:text-lorenzo-dark transition-colors duration-300"
            >
              Ver Projetos
            </motion.button>
            <Link href="/articles">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-lorenzo-accent/10 text-lorenzo-accent font-black uppercase px-8 py-4 text-sm tracking-wider transition-colors duration-300 flex items-center gap-2"
              >
                <BookOpen size={18} />
                Ler Artigos
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-lorenzo-light/50 text-[10px] tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="text-lorenzo-accent" size={24} />
          </motion.div>
        </motion.div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-12 w-px h-32 bg-gradient-to-b from-transparent via-lorenzo-accent/30 to-transparent" />
        <div className="absolute top-0 right-12 w-px h-32 bg-gradient-to-b from-transparent via-lorenzo-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-px h-24 bg-gradient-to-t from-transparent via-lorenzo-accent/20 to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-px h-24 bg-gradient-to-t from-transparent via-lorenzo-accent/20 to-transparent" />
      </div>

      {/* Marquee Background (aparece com scroll)
      <motion.div
        style={{ opacity: useTransform(smoothProgress, [0.2, 0.4], [0, 0.1]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <div className="whitespace-nowrap animate-infinite-slide">
          <span className="text-[20vw] font-black text-lorenzo-light uppercase tracking-tighter mx-8">
            CODE • SECURITY • DEVOPS • INNOVATION •
          </span>
          <span className="text-[20vw] font-black text-lorenzo-light uppercase tracking-tighter mx-8">
            CODE • SECURITY • DEVOPS • INNOVATION •
          </span>
        </div>
      </motion.div> */}
    </section>
  );
}
