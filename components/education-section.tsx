"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Target } from "lucide-react";

export function EducationSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              <GraduationCap className="w-10 h-10 text-green-400" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Formação Acadêmica
            </h2>
          </div>
          <p className="text-gray-400 text-lg">Minha base educacional</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-green-500/50 transition-all shadow-xl hover:shadow-green-500/20"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/50">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-2">
                FIAP – Faculdade de Informática e Administração Paulista
              </h3>
              <p className="text-xl text-green-400 font-semibold mb-4">
                Bacharelado em Engenharia da Computação
              </p>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span>Janeiro/2022 – Dezembro/2026</span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <Target className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 leading-relaxed">
                  Ênfase em sistemas embarcados, segurança da informação e
                  engenharia de software. Participação em projetos acadêmicos
                  envolvendo IA, Big Data, e desenvolvimento de sistemas de alta
                  performance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
