"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";

const experiences = [
  {
    company: "XP Inc.",
    role: "Engenheiro de software",
    period: "Nov/2025 – Presente",
    location: "São Paulo, SP",
    description:
      "Atuação como engenheiro de software, participando do desenho e evolução da arquitetura do projeto. Desenvolvimento de APIs REST em C# e TypeScript, com front-end em React.js. Trabalho em conjunto com a equipe na definição de soluções técnicas eficientes e escaláveis, com uso de mensageria e boas práticas de engenharia de software.",
    technologies: [
      "C#",
      "TypeScript",
      "React.js",
      "API REST",
      "DDD",
      "Kafka",
      "RabbitMQ",
      "MongoDB",
      "Redis",
      "Azure DevOps",
      "Linux",
      "Testes Funcionais",
      "Arquitetura de Software",
    ],
    current: true,
  },
  {
    company: "Management Solutions",
    role: "Engenheiro de Dados",
    period: "Set/2025 – Nov/2025",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento e manutenção de pipelines de dados, realizando ETL de grandes volumes de informações. Atuo no cruzamento e integração de dados para suporte à análise e tomada de decisão.",
    technologies: [
      "PySpark",
      "CI/CD",
      "Python",
      "SQL",
      "Big Data",
      "Delta Lake",
    ],
    current: false,
  },
  {
    company: "Eval Digital",
    role: "Desenvolvedor de Software",
    period: "Out/2024 – Set/2025",
    location: "São Paulo, SP",
    description:
      "Desenvolvimento e manutenção de sistemas para o Banco Central (PIX e SFN). Implementação de testes unitários, otimização de desempenho e detecção de memory leaks.",
    technologies: ["C++", "Java", "NextJs", "Docker", "Kubernetes", "Oracle"],
    current: false,
  },
  {
    company: "Eval Digital",
    role: "Estagiário em Criptografia",
    period: "Set/2022 – Nov/2024",
    location: "São Paulo, SP",
    description:
      "Participação em projetos de criptografia de ponta a ponta e proteção de dados. Documentação técnica e análise de requisitos junto a clientes.",
    technologies: ["Criptografia", "Segurança", "Linux", "HSM"],
    current: false,
  },
];

export function TimelineSection() {
  return (
    <section
      id="experience"
      data-theme="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              #c8f550,
              #c8f550 1px,
              transparent 1px,
              transparent 10px
            )`,
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Carreira
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
            Experiência
            <br />
            <span className="text-lorenzo-accent font-brier italic">
              Profissional
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-lorenzo-light/10 origin-top"
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-16 md:pl-24"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  viewport={{ once: true }}
                  className={`absolute left-0 w-12 md:w-16 h-12 md:h-16 flex items-center justify-center ${
                    exp.current ? "bg-lorenzo-accent" : "bg-lorenzo-light/10"
                  }`}
                >
                  <Briefcase
                    size={24}
                    className={
                      exp.current
                        ? "text-lorenzo-dark"
                        : "text-lorenzo-light/60"
                    }
                  />
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.2 }}
                  className={`group p-6 md:p-8 transition-all duration-300 ${
                    exp.current
                      ? "bg-lorenzo-accent"
                      : "bg-lorenzo-light/5 hover:bg-lorenzo-light/10"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      {exp.current && (
                        <span className="inline-block text-xs font-bold uppercase tracking-wider text-lorenzo-dark/60 mb-2">
                          Atual
                        </span>
                      )}
                      <h3
                        className={`text-xl md:text-2xl font-bold uppercase tracking-wide ${
                          exp.current
                            ? "text-lorenzo-dark"
                            : "text-lorenzo-light"
                        }`}
                      >
                        {exp.company}
                      </h3>
                      <p
                        className={`font-semibold text-lg ${
                          exp.current
                            ? "text-lorenzo-dark/80"
                            : "text-lorenzo-light/60"
                        }`}
                      >
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <span
                        className={`text-sm font-bold tracking-wide px-3 py-1 ${
                          exp.current
                            ? "bg-lorenzo-dark/10 text-lorenzo-dark"
                            : "bg-lorenzo-light/10 text-lorenzo-light/60"
                        }`}
                      >
                        {exp.period}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          exp.current
                            ? "text-lorenzo-dark/60"
                            : "text-lorenzo-light/40"
                        }`}
                      >
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`leading-relaxed mb-5 ${
                      exp.current
                        ? "text-lorenzo-dark/80"
                        : "text-lorenzo-light/60"
                    }`}
                  >
                    {exp.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs font-semibold uppercase tracking-wide px-3 py-1.5 transition-colors duration-300 ${
                          exp.current
                            ? "bg-lorenzo-dark/10 text-lorenzo-dark"
                            : "bg-lorenzo-light/5 text-lorenzo-light/50 group-hover:bg-lorenzo-accent/20 group-hover:text-lorenzo-accent"
                        }`}
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
