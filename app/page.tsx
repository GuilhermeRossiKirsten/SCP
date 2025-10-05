"use client";

import { useState, useEffect } from "react";
import { SystemInvasion } from "../components/system-invasion";
import { HeroSection } from "../components/hero-section";
import { AboutSection } from "../components/about-section";
import { SkillsSection } from "../components/skills-section";
import { ProjectsSection } from "../components/projects-section";
import { TimelineSection } from "../components/timeline-section";
import { EducationSection } from "../components/education-section";
import { CertificationsSection } from "../components/certifications-section";
import { ContactSection } from "../components/contact-section";
import { Footer } from "../components/footer";
import { MouseCursor } from "../components/mouse-cursor";
import { MouseParticles } from "../components/mouse-particles";
import { MouseParallax } from "../components/mouse-parallax";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Auto-hide intro after 5 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 100000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-black">
      {showIntro && <SystemInvasion onComplete={() => setShowIntro(false)} />}

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
