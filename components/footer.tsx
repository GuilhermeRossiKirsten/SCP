"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BookOpen } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 px-4 bg-black border-t border-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
              Guilherme Rossi Kirsten
            </h3>
            <p className="text-gray-400 text-sm">
              Desenvolvedor Fullstack | SecDevOps Enthusiast
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-3">
              Links Rápidos
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/articles"
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Artigos
                </span>
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-lg font-semibold text-white mb-3">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/GuilhermeRossiKirsten"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/guilhermerossikirsten/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-300" />
              </a>
              <a
                href="mailto:guirossik10@gmail.com"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-300" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Guilherme Rossi Kirsten. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
