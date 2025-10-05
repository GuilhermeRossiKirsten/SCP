"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Sobre Mim
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Sou desenvolvedor fullstack com experiência em C++, Golang, React
              e Next.js. Atuo em projetos críticos do Banco Central e PIX, com
              foco em segurança, escalabilidade e automação DevSecOps.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Apaixonado por criar sistemas robustos e seguros, sempre buscando
              as melhores práticas em desenvolvimento e operações. Minha
              experiência abrange desde criptografia e certificados digitais até
              arquiteturas cloud e CI/CD.
            </p>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/guilhermerossikirsten/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
                asChild
              >
                <a
                  href="https://github.com/GuilhermeRossiKirsten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="relative w-64 h-64 mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur-2xl opacity-50" />
              <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-4 border-green-500/30 flex items-center justify-center overflow-hidden">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
