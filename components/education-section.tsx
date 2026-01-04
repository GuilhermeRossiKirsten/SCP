"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function EducationSection() {
  return (
    <section
      id="education"
      data-theme="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Formação
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
            Educação
            <br />
            <span className="text-lorenzo-accent font-brier italic">
              Acadêmica
            </span>
          </h2>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="bg-lorenzo-accent p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Icon */}
              <div className="w-20 h-20 bg-lorenzo-dark/10 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={40} className="text-lorenzo-dark" />
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Badge */}
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-lorenzo-dark/60 mb-3">
                  Em andamento
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-lorenzo-dark mb-2">
                  Engenharia da Computação
                </h3>

                {/* Institution */}
                <p className="text-lg font-semibold text-lorenzo-dark/80 mb-6">
                  FIAP – Faculdade de Informática e Administração Paulista
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-lorenzo-dark/70">
                    <Calendar size={18} />
                    <span className="font-semibold">Jan/2022 – Dez/2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-lorenzo-dark/70">
                    <MapPin size={18} />
                    <span className="font-semibold">São Paulo, SP</span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-lorenzo-dark/10 p-5">
                  <p className="text-lorenzo-dark/80 leading-relaxed">
                    Bacharelado com ênfase em sistemas embarcados, segurança da
                    informação e engenharia de software. Participação em
                    projetos acadêmicos envolvendo IA, Big Data e
                    desenvolvimento de sistemas de alta performance.
                  </p>
                </div>

                {/* Focus Areas */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {[
                    "Sistemas Embarcados",
                    "Segurança",
                    "IA",
                    "Big Data",
                    "Alta Performance",
                  ].map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 bg-lorenzo-dark/10 text-lorenzo-dark text-xs font-bold uppercase tracking-wide"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
