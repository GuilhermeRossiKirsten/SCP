"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const certifications = [
  {
    title: "Go: a linguagem do Google",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2025",
    skills: ["Golang", "APIs", "Desempenho", "Concorrência", "Backend"],
  },
  {
    title: "Cloud Fundamentals, Administration and Solution Architect",
    institution: "FIAP",
    category: "Cloud",
    date: "mar de 2025",
    skills: ["Docker", "Kubernetes", "Azure", "Cloud"],
  },
  {
    title: "Curso de Domain Driven Design",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    skills: ["DDD", "Design Patterns", "Arquitetura"],
  },
  {
    title: "Curso de Fundamentos da arquitetura de software",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    skills: ["Arquitetura", "Design Patterns", "Software"],
  },
  {
    title: "Curso de SOLID Express",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    skills: ["SOLID", "Clean Code", "Design Patterns"],
  },
  {
    title: "Front End",
    institution: "FIAP",
    category: "Programação",
    date: "out de 2024",
    skills: ["HTML5", "CSS", "JavaScript", "TypeScript", "Bootstrap", "Git"],
  },
  {
    title: "Códigos de Alta Performance",
    institution: "FIAP",
    category: "Programação",
    date: "jun de 2024",
    skills: ["Estrutura de dados", "Algoritmos", "Otimização"],
  },
  {
    title: "Trilha Digital | Coders 24 | Back End",
    institution: "Ada",
    category: "Programação",
    date: "jun de 2024",
    skills: ["Java", "POO", "Design Patterns", "SQL", "Git", "Algoritmos"],
  },
  {
    title: "C++: Conhecendo a linguagem e a STL",
    institution: "Alura",
    category: "Programação",
    date: "fev de 2024",
    skills: ["C++", "Algoritmos", "STL"],
  },
  {
    title: "Descubra a Inteligência Artificial Generativa",
    institution: "LinkedIn",
    category: "IA",
    date: "fev de 2024",
    skills: ["IA Generativa", "Machine Learning", "AI"],
  },
  {
    title: "NLW Expert trilha de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "fev de 2024",
    skills: ["Java", "Spring Boot", "APIs"],
  },
  {
    title: "Docker: criando e gerenciando containers",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    skills: ["Docker", "Containers", "DevOps"],
  },
  {
    title: "Kubernetes: Pods, Services e ConfigMaps",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    skills: ["Kubernetes", "Orquestração", "Containers"],
  },
  {
    title: "Curso de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "out de 2023",
    skills: ["Java", "POO", "Backend"],
  },
  {
    title: "Java Development",
    institution: "FIAP",
    category: "Programação",
    date: "set de 2023",
    skills: ["Java", "Spring Boot", "APIs REST"],
  },
  {
    title: "Java Xpert",
    institution: "FIAP",
    category: "Programação",
    date: "set de 2023",
    skills: ["Java", "Spring Boot", "Azure", "HTML5", "CSS", "APIs"],
  },
  {
    title: "C#: criando sua primeira aplicação",
    institution: "Alura",
    category: "Programação",
    date: "ago de 2023",
    skills: ["C#", ".NET", "POO"],
  },
  {
    title: "Certificação Linux LPI Essentials parte 3: Command Line Basics",
    institution: "Alura",
    category: "Linux",
    date: "jul de 2023",
    skills: ["Linux", "CLI", "Bash", "Shell"],
  },
  {
    title: "Git e GitHub: repositório, commit e versões",
    institution: "Alura",
    category: "DevOps",
    date: "jul de 2023",
    skills: ["Git", "GitHub", "Controle de versão"],
  },
  {
    title:
      "Certificação Linux LPI Essentials parte 2: Open Source Software and Licensing",
    institution: "Alura",
    category: "Linux",
    date: "jun de 2023",
    skills: ["Linux", "Open Source", "Licenciamento"],
  },
  {
    title: "DevOps",
    institution: "FIAP",
    category: "DevOps",
    date: "jun de 2023",
    skills: ["CI/CD", "Pipelines", "Automação"],
  },
  {
    title:
      "JavaScript e HTML: desenvolva um jogo e pratique lógica de programação",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    skills: ["JavaScript", "HTML", "Lógica"],
  },
  {
    title:
      "Lógica de programação: comece em lógica com o jogo Pong e JavaScript",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    skills: ["JavaScript", "Lógica", "Programação"],
  },
  {
    title: "Python: começando com a linguagem",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    skills: ["Python", "Programação", "Backend"],
  },
  {
    title:
      "Certificação Linux LPI Essentials parte 1: Evolution and Distributions",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    skills: ["Linux", "Distribuições", "Fundamentos"],
  },
  {
    title: "Hardening e Configuração de Servidores",
    institution: "FIAP",
    category: "Segurança",
    date: "abr de 2023",
    skills: ["Hardening", "Servidores", "Segurança"],
  },
  {
    title: "Linux I: conhecendo e utilizando o terminal",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    skills: ["Linux", "Terminal", "CLI"],
  },
  {
    title: "Linux II: programas, processos e pacotes",
    institution: "Alura",
    category: "Linux",
    date: "mar de 2023",
    skills: ["Linux", "Processos", "Pacotes"],
  },
  {
    title: "Lei Geral de Proteção de Dados (LGPD)",
    institution: "Fundação Bradesco",
    category: "Segurança",
    date: "out de 2022",
    skills: ["LGPD", "Privacidade", "Compliance"],
  },
  {
    title: "Estruturas de Computadores",
    institution: "FIAP",
    category: "Fundamentos",
    date: "set de 2022",
    skills: ["Hardware", "Arquitetura", "Computadores"],
  },
  {
    title: "Algoritmos: Aprenda a programar",
    institution: "FIAP",
    category: "Programação",
    date: "ago de 2022",
    skills: ["Algoritmos", "Java", "Lógica"],
  },
  {
    title: "Gestão de Infraestrutura de TI",
    institution: "FIAP",
    category: "Fundamentos",
    date: "ago de 2022",
    skills: ["Infraestrutura", "TI", "Gestão"],
  },
  {
    title: "Linux Fundamentos",
    institution: "FIAP",
    category: "Linux",
    date: "ago de 2022",
    skills: ["Linux", "Fundamentos", "CLI"],
  },
  {
    title: "Python",
    institution: "FIAP",
    category: "Programação",
    date: "ago de 2022",
    skills: ["Python", "Automação", "POO"],
  },
  {
    title: "Formação Social e Sustentabilidade",
    institution: "FIAP",
    category: "Fundamentos",
    date: "mar de 2022",
    skills: ["Sustentabilidade", "ESG", "Sociedade"],
  },
];

const categories = [
  "Todos",
  "Programação",
  "DevOps",
  "Cloud",
  "Arquitetura",
  "Linux",
  "Segurança",
  "IA",
  "Fundamentos",
];

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false);
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredCerts =
    activeCategory === "Todos"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  const displayedCerts = showAll ? filteredCerts : filteredCerts.slice(0, 9);

  return (
    <section
      id="certifications"
      data-theme="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0f0f10]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Conhecimento
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
              Certificações
              <br />
              <span className="text-lorenzo-accent font-brier italic">
                & Cursos
              </span>
            </h2>
            <p className="text-lorenzo-light/40 text-sm">
              {certifications.length} certificações
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-lorenzo-accent text-lorenzo-dark"
                  : "bg-lorenzo-light/5 text-lorenzo-light/60 hover:bg-lorenzo-light/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCerts.map((cert) => (
            <div
              key={cert.title}
              onClick={() => setExpandedCert(cert.title)}
              className="group relative bg-lorenzo-light/5 p-5 hover:bg-lorenzo-light/10 transition-all cursor-pointer"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-lorenzo-accent bg-lorenzo-accent/10 px-2 py-1">
                  {cert.category}
                </span>
                <span className="text-[10px] text-lorenzo-light/30 font-semibold">
                  {cert.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-lorenzo-light mb-2 leading-tight group-hover:text-lorenzo-accent transition-colors line-clamp-2">
                {cert.title}
              </h3>

              {/* Institution */}
              <p className="text-sm text-lorenzo-light/50 mb-4">
                {cert.institution}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {cert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-1 bg-lorenzo-light/5 text-lorenzo-light/50 font-semibold uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 3 && (
                  <span className="text-[10px] px-2 py-1 bg-lorenzo-light/5 text-lorenzo-light/30 font-semibold">
                    +{cert.skills.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {!showAll && filteredCerts.length > 9 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center gap-2 px-8 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-light hover:text-lorenzo-dark transition-all duration-300"
            >
              <span>Ver Todas</span>
              <ChevronDown size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {expandedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedCert(null)}
            className="fixed inset-0 bg-lorenzo-dark/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a1b] p-8 max-w-xl w-full relative overflow-hidden"
            >
              <button
                onClick={() => setExpandedCert(null)}
                className="absolute top-4 right-4 p-2 bg-lorenzo-light/5 hover:bg-lorenzo-light/10 transition-colors"
              >
                <X size={20} className="text-lorenzo-light" />
              </button>

              {(() => {
                const cert = certifications.find(
                  (c) => c.title === expandedCert,
                );
                if (!cert) return null;

                return (
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-lorenzo-accent mb-3 block">
                      {cert.category}
                    </span>

                    <h3 className="text-2xl font-black uppercase tracking-wide text-lorenzo-light mb-2">
                      {cert.title}
                    </h3>

                    <div className="flex items-center gap-2 text-lorenzo-light/50 text-sm mb-6">
                      <ExternalLink size={16} />
                      <span className="font-semibold">{cert.institution}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-lorenzo-light/40 mb-3">
                        Habilidades
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-lorenzo-accent/10 text-lorenzo-accent text-sm font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedCert(null)}
                      className="w-full py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-light hover:text-lorenzo-dark transition-all duration-300"
                    >
                      Fechar
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
