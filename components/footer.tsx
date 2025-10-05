"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
              Guilherme Rossi Kirsten
            </h3>
            <p className="text-gray-400 text-sm">
              Desenvolvedor Fullstack | SecDevOps Enthusiast
            </p>
          </div>

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

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Guilherme Rossi Kirsten. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
