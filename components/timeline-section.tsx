"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Management Solutions",
    role: "Engenheiro de Software",
    period: "Set/2025 – Presente",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento de soluções para sistemas corporativos, com foco em desempenho, integração e confiabilidade. Uso de práticas de DevSecOps, testes automatizados e integração contínua. Colaboração com equipes multidisciplinares para entrega de software seguro e escalável.",
    technologies: ["DevSecOps", "CI/CD", "Testes Automatizados"],
  },
  {
    company: "Eval Digital",
    role: "Desenvolvedor de Software",
    period: "Out/2024 – Set/2025",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento e manutenção de sistemas para o Banco Central (PIX e SFN). Implementação de testes unitários, otimização de desempenho e detecção de memory leaks. Uso de Docker, Kubernetes e bancos Oracle, SQL Server e MySQL. Aplicação de soluções compatíveis com LGPD e segurança de dados.",
    technologies: [
      "Docker",
      "Kubernetes",
      "Oracle",
      "SQL Server",
      "MySQL",
      "LGPD",
    ],
  },
  {
    company: "Eval Digital Soluções Ágeis e Criptografia de Sistemas",
    role: "Estagiário em Criptografia e Segurança",
    period: "Set/2022 – Nov/2024",
    location: "São Paulo, SP",
    description:
      "Participação em projetos de criptografia de ponta a ponta e proteção de dados. Responsável por documentação técnica e análise de requisitos junto a clientes. Apoio no desenvolvimento de sistemas de alta disponibilidade.",
    technologies: ["Criptografia", "Segurança", "Documentação Técnica"],
  },
];

export function TimelineSection() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Experiência Profissional
          </h2>
          <p className="text-gray-400 text-lg">
            Minha trajetória no desenvolvimento de software
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-lime-500"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative pl-20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="absolute left-0 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center border-4 border-black shadow-lg shadow-green-500/50"
                >
                  <Briefcase className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.company}
                      </h3>
                      <p className="text-green-400 font-semibold text-lg">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
