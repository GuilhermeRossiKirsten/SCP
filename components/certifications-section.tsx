"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ChevronDown, X } from "lucide-react";
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
    category: "Cloud Computing",
    date: "mar de 2025",
    skills: [
      "Docker",
      "Kubernetes",
      "Azure",
      "Cloud",
      "AWS",
      "GCP",
      "DevOps",
      "Arquitetura em Nuvem",
    ],
  },
  {
    title: "Curso de Domain Driven Design",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    skills: ["Typescript", "DDD", "Design Patterns", "Arquitetura de Software"],
  },
  {
    title: "Curso de Fundamentos da arquitetura de software",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    skills: ["Typescript", "Arquitetura", "Design Patterns", "Boas práticas"],
  },
  {
    title: "Curso de SOLID Express",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    skills: ["Typescript", "SOLID", "Boas práticas", "Clean Code"],
  },
  {
    title: "Front End",
    institution: "FIAP",
    category: "Programação",
    date: "out de 2024",
    skills: [
      "HTML5",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Bootstrap",
      "Git",
      "Frontend",
      "UI",
      "UX",
    ],
  },
  {
    title: "Códigos de Alta Performance",
    institution: "FIAP",
    category: "Programação",
    date: "jun de 2024",
    skills: [
      "Estrutura de dados",
      "Algoritmos",
      "Complexidade de tempo",
      "Otimização",
    ],
  },
  {
    title: "Trilha Digital | Coders 24 | Back End",
    institution: "Ada",
    category: "Programação",
    date: "jun de 2024",
    skills: ["Java", "POO", "Design Patterns", "SQL", "Algoritmos", "Backend"],
  },
  {
    title: "C++: Conhecendo a linguagem e a STL",
    institution: "Alura",
    category: "Programação",
    date: "fev de 2024",
    skills: [
      "C++",
      "Algoritmos",
      "Estrutura de dados",
      "STL",
      "Programação de baixo nível",
    ],
  },
  {
    title: "Descubra a Inteligência Artificial Generativa",
    institution: "LinkedIn",
    category: "IA",
    date: "fev de 2024",
    skills: [
      "IA",
      "Machine Learning",
      "Modelos Generativos",
      "ChatGPT",
      "Prompt Engineering",
    ],
  },
  {
    title: "NLW Expert trilha de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "fev de 2024",
    skills: ["Java", "APIs REST", "Spring Boot", "POO"],
  },
  {
    title: "Docker: criando e gerenciando containers",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    skills: ["Docker", "Containers", "DevOps", "Infraestrutura como Código"],
  },
  {
    title: "Kubernetes: Pods, Services e ConfigMaps",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    skills: ["Docker", "Kubernetes", "Cluster", "Orquestração", "Deploy"],
  },
  {
    title: "Curso de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "out de 2023",
    skills: ["Java", "POO", "APIs", "Spring"],
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
    skills: ["Java", "Spring Boot", "Oracle", "Azure DevOps", "SQL"],
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
    skills: ["Linux", "Shell Script", "Bash", "CLI"],
  },
  {
    title: "Git e GitHub: repositório, commit e versões",
    institution: "Alura",
    category: "DevOps",
    date: "jul de 2023",
    skills: ["Git", "Github", "Gitlab", "Controle de versão", "Colaboração"],
  },
  {
    title: "Certificação Linux LPI Essentials parte 2: Open Source Software",
    institution: "Alura",
    category: "Linux",
    date: "jun de 2023",
    skills: ["Linux", "Open Source", "Pacotes", "Sistema de arquivos"],
  },
  {
    title: "DevOps",
    institution: "FIAP",
    category: "DevOps",
    date: "jun de 2023",
    skills: ["DevOps", "Integração Contínua", "Entrega Contínua", "Pipelines"],
  },
  {
    title: "JavaScript e HTML: desenvolva um jogo e pratique lógica",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    skills: ["JavaScript", "HTML", "Lógica de Programação", "DOM"],
  },
  {
    title: "Lógica de programação: comece em lógica com o jogo Pong",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    skills: ["Lógica de Programação", "JavaScript", "Game Dev"],
  },
  {
    title: "Python: começando com a linguagem",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    skills: ["Python", "Sintaxe", "Estrutura de dados", "Algoritmos"],
  },
  {
    title:
      "Certificação Linux LPI Essentials parte 1: Evolution and Distributions",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    skills: [
      "Linux",
      "Distribuições",
      "História do Linux",
      "Sistema Operacional",
    ],
  },
  {
    title: "Hardening e Configuração de Servidores",
    institution: "FIAP",
    category: "DevOps",
    date: "abr de 2023",
    skills: ["Hardening", "Servidores", "Segurança", "Linux", "Configuração"],
  },
  {
    title: "Linux I: conhecendo e utilizando o terminal",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    skills: ["Linux", "Terminal", "CLI", "Comandos básicos"],
  },
  {
    title: "Linux II: programas, processos e pacotes",
    institution: "Alura",
    category: "Linux",
    date: "mar de 2023",
    skills: ["Linux", "Processos", "Pacotes", "Gerenciamento de Sistema"],
  },
  {
    title: "Lei Geral de Proteção de Dados (LGPD)",
    institution: "Fundação Bradesco",
    category: "Segurança",
    date: "out de 2022",
    skills: ["LGPD", "Segurança da Informação", "Privacidade", "Compliance"],
  },
  {
    title: "Estruturas de Computadores",
    institution: "FIAP",
    category: "Fundamentos",
    date: "set de 2022",
    skills: ["Arquitetura de Computadores", "Hardware", "Fundamentos de TI"],
  },
  {
    title: "Algoritmos: Aprenda a programar",
    institution: "FIAP",
    category: "Fundamentos",
    date: "ago de 2022",
    skills: ["Java", "Algoritmos", "Lógica", "POO"],
  },
  {
    title: "Gestão de Infraestrutura de TI",
    institution: "FIAP",
    category: "Gestão",
    date: "ago de 2022",
    skills: ["Infraestrutura", "Gestão de TI", "Servidores", "Cloud"],
  },
  {
    title: "Linux Fundamentos",
    institution: "FIAP",
    category: "Linux",
    date: "ago de 2022",
    skills: ["Linux", "Comandos Básicos", "Sistema de Arquivos"],
  },
  {
    title: "Python",
    institution: "FIAP",
    category: "Programação",
    date: "ago de 2022",
    skills: ["Python", "Sintaxe", "POO", "Automação"],
  },
  {
    title: "Formação Social e Sustentabilidade",
    institution: "FIAP",
    category: "Gestão",
    date: "mar de 2022",
    skills: ["Sustentabilidade", "Ética", "Responsabilidade Social"],
  },
];

const categoryColors: Record<string, string> = {
  "Cloud Computing": "from-green-500 to-teal-500",
  DevOps: "from-emerald-500 to-green-600",
  Programação: "from-lime-500 to-green-500",
  IA: "from-teal-500 to-emerald-500",
  Arquitetura: "from-green-600 to-emerald-600",
  Linux: "from-green-400 to-teal-400",
  Segurança: "from-emerald-600 to-green-700",
  Fundamentos: "from-lime-400 to-green-400",
  Gestão: "from-teal-600 to-emerald-700",
};

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false);
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const displayedCerts = showAll ? certifications : certifications.slice(0, 9);

  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="w-10 h-10 text-green-400" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Certificações e Cursos Extras
            </h2>
          </div>
          <p className="text-gray-400 text-lg">
            {certifications.length} certificações de aprendizado contínuo e
            especialização
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCerts.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              onClick={() => setExpandedCert(cert.title)}
              className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all cursor-pointer shadow-lg hover:shadow-green-500/20"
            >
              <div
                className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${categoryColors[cert.category]} flex items-center justify-center shadow-lg`}
              >
                <Award className="w-6 h-6 text-white" />
              </div>

              <div className="pr-16">
                <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">
                  {cert.category}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3 leading-tight group-hover:text-green-400 transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <span>{cert.institution}</span>
                </div>
                <p className="text-xs text-gray-500">{cert.date}</p>
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {cert.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded-full">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 rounded-xl transition-all pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {!showAll && certifications.length > 9 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-green-500/50 hover:scale-105"
            >
              <span>Carregar Mais Certificações</span>
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {expandedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedCert(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-green-500/30 shadow-2xl shadow-green-500/20 relative overflow-hidden"
            >
              <button
                onClick={() => setExpandedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>

              {(() => {
                const cert = certifications.find(
                  (c) => c.title === expandedCert,
                );
                if (!cert) return null;

                return (
                  <div>
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${categoryColors[cert.category]} flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs text-green-400 font-semibold uppercase tracking-wider">
                          {cert.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-1 mb-2 leading-tight">
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <ExternalLink className="w-4 h-4" />
                          <span>{cert.institution}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-400">
                        <span className="text-green-400 font-semibold">
                          Data de emissão:
                        </span>{" "}
                        {cert.date}
                      </p>
                    </div>

                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-green-400 mb-3">
                          Habilidades desenvolvidas:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-700 pt-6">
                      <h4 className="text-sm font-semibold text-green-400 mb-3">
                        Sobre o curso:
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {cert.category === "Cloud Computing" &&
                          "Certificação focada em fundamentos de computação em nuvem, administração de recursos cloud e arquitetura de soluções escaláveis utilizando as principais plataformas do mercado."}
                        {cert.category === "DevOps" &&
                          "Curso abrangendo práticas de DevOps, incluindo automação, integração contínua, entrega contínua, containerização e orquestração de aplicações."}
                        {cert.category === "Programação" &&
                          "Formação em desenvolvimento de software com foco em boas práticas de programação, estruturas de dados, algoritmos e desenvolvimento de aplicações robustas."}
                        {cert.category === "IA" &&
                          "Curso introdutório sobre inteligência artificial generativa, explorando conceitos fundamentais, aplicações práticas e o impacto da IA no desenvolvimento de software."}
                        {cert.category === "Arquitetura" &&
                          "Certificação em arquitetura de software, abordando padrões de design, princípios SOLID, Domain Driven Design e fundamentos para construção de sistemas escaláveis e manuteníveis."}
                        {cert.category === "Linux" &&
                          "Formação em sistemas Linux, cobrindo linha de comando, administração de sistemas, gerenciamento de processos, pacotes e preparação para certificações LPI."}
                        {cert.category === "Segurança" &&
                          "Curso focado em segurança da informação, proteção de dados, conformidade com LGPD e boas práticas de segurança em desenvolvimento de software."}
                        {cert.category === "Fundamentos" &&
                          "Certificação em fundamentos de computação, incluindo estruturas de computadores, algoritmos básicos e conceitos essenciais de ciência da computação."}
                        {cert.category === "Gestão" &&
                          "Curso abordando gestão de infraestrutura de TI, práticas de sustentabilidade e aspectos sociais relacionados à tecnologia da informação."}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <button
                        onClick={() => setExpandedCert(null)}
                        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-green-500/50"
                      >
                        Fechar
                      </button>
                    </div>
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
