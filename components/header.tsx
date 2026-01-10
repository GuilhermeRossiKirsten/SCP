"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ScrollProgressBar from "../app/articles/[slug]/ScrollProgressBar";

const menuItems = [
  { label: "Home", href: "#hero" },
  { label: "Sobre", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projetos", href: "#projects" },
  { label: "Experiência", href: "#experience" },
  { label: "Certificações", href: "#certifications" },
  { label: "Artigos", href: "/articles" },
  { label: "Contato", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoColor, setLogoColor] = useState<"dark" | "light">("light");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detecta a cor do logo baseado na seção
      const sections = document.querySelectorAll("section[data-theme]");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const theme = section.getAttribute("data-theme");
          setLogoColor(theme === "light" ? "dark" : "light");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia scroll quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-xl bg-lorenzo-dark/80" : "bg-transparent"
        }`}
      >
        <ScrollProgressBar />
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.span
              className={`font-brier text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                logoColor === "dark" || isMenuOpen
                  ? "text-lorenzo-dark"
                  : "text-lorenzo-light"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GRK
            </motion.span>
          </Link>

          {/* Botão do Menu */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-10 w-12 h-12 flex items-center justify-center transition-colors duration-300 ${
              isMenuOpen
                ? "bg-lorenzo-accent text-lorenzo-dark"
                : "bg-lorenzo-dark/80 text-lorenzo-light hover:bg-lorenzo-accent hover:text-black"
            }`}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-lorenzo-dark/95 backdrop-blur-xl"
          >
            <nav className="h-full flex flex-col items-center justify-center gap-4 md:gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: 20, rotate: -5 }}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-lorenzo-light hover:text-lorenzo-accent transition-colors duration-300 tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer do menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-0 right-0 px-6 md:px-12 flex justify-between items-center"
            >
              <span className="text-lorenzo-light/50 text-xs tracking-widest uppercase">
                © {new Date().getFullYear()} GRK
              </span>
              <span className="text-lorenzo-light/50 text-xs tracking-widest uppercase">
                Dev / SecOps
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
