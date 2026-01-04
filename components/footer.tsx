"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  pages: [
    { label: "Home", href: "#hero" },
    { label: "Sobre", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projetos", href: "#projects" },
    { label: "Experiência", href: "#experience" },
    { label: "Certificações", href: "#certifications" },
    { label: "Artigos", href: "/articles" },
    { label: "Contato", href: "#contact" },
  ],
  social: [
    {
      label: "GitHub",
      href: "https://github.com/GuilhermeRossiKirsten",
      icon: Github,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/guilhermerossikirsten/",
      icon: Linkedin,
    },
    { label: "Email", href: "mailto:guirossik10@gmail.com", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lorenzo-accent text-xs tracking-[0.2em] uppercase font-bold mb-6">
              Páginas
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.pages.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-2 text-lorenzo-light/70 hover:text-lorenzo-accent transition-colors duration-300"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Center - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black text-lorenzo-light uppercase tracking-tight mb-6">
              Vamos
              <br />
              <span className="text-lorenzo-accent">Trabalhar</span>
              <br />
              Juntos?
            </h2>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-lorenzo-accent text-lorenzo-dark font-bold uppercase px-6 py-3 text-sm tracking-wider hover:bg-lorenzo-light hover:text-lorenzo-dark transition-colors duration-300"
            >
              Entre em Contato
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:text-right"
          >
            <h3 className="text-lorenzo-accent text-xs tracking-[0.2em] uppercase font-bold mb-6">
              Social
            </h3>
            <div className="flex md:justify-end gap-3">
              {footerLinks.social.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-lorenzo-light/5 hover:bg-lorenzo-accent hover:text-black flex items-center justify-center text-lorenzo-light/70 transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-lorenzo-light/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-lorenzo-accent font-bold text-xl tracking-tight">
            GRK
          </span>
          <p className="text-lorenzo-light/40 text-sm">
            © {new Date().getFullYear()} Guilherme Rossi Kirsten. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
