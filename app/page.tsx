"use client";

import { useState, useEffect } from "react";
import { SystemInvasion } from "@/components/system-invasion";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { TimelineSection } from "@/components/timeline-section";
import { EducationSection } from "@/components/education-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { MouseCursor } from "@/components/mouse-cursor";
import { MouseParticles } from "@/components/mouse-particles";
import { MouseParallax } from "@/components/mouse-parallax";
import { motion } from "framer-motion";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Auto-hide intro after 5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 500000);

    return () => clearTimeout(timer);
  }, []);

  function BodyLock() {
    useEffect(() => {
      // Bloqueia scroll
      document.body.style.overflow = "hidden";
      return () => {
        // Restaura scroll
        document.body.style.overflow = "";
      };
    }, []);

    return null;
  }

  return (
    <main className="relative min-h-screen bg-black">
      {showIntro && <SystemInvasion onComplete={() => setShowIntro(false)} />}

      {showIntro && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 10, duration: 0.9, type: "spring" }}
          className="h-screen flex items-center justify-center pointer-events-none"
        >
          <BodyLock />
          <div className="text-center">
            <h1
              className="text-7xl md:text-8xl font-bold text-green-300 mb-4 font-mono"
              style={{ textShadow: "0 0 30px rgba(16,185,129,0.8)" }}
            >
              GRK
            </h1>
            <div className="mx-auto h-0.5 w-40 bg-gradient-to-r from-transparent via-green-300 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shine_2s_linear_infinite]" />
            </div>
            <p className="mt-4 text-green-300/80 text-sm tracking-widest font-mono">
              GUILHERME ROSSI KIRSTEN
            </p>
            <p className="text-green-300/60 text-xs tracking-wider font-mono mt-1">
              JUNIOR PROGRAMMER • SECDEVOPS
            </p>
          </div>
        </motion.div>
      )}

      {!showIntro && (
        <>
          <MouseCursor />
          <MouseParticles />
          <MouseParallax />
        </>
      )}

      <div
        className={`transition-opacity duration-1000 ${showIntro ? "opacity-0" : "opacity-100"}`}
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TimelineSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
