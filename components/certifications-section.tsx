"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const certifications = [
  {
    title: "Cybersecurity",
    institution: "FIAP",
    category: "Segurança",
    date: "jun de 2025",
    image:
      "https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=e976469a6367de7915ddaa37ee8e191d&action=view",
    skills: [
      "Cybersecurity",
      "Segurança da Informação",
      "Proteção de Dados",
      "Cibersegurança",
    ],
  },
  {
    title: "Go: a linguagem do Google",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2025",
    image:
      "https://cursos.alura.com.br/certificate/c0d7df2c-5836-4005-85b2-d1f4934688d6?lang",
    skills: ["Golang", "APIs", "Desempenho", "Concorrência", "Backend"],
  },
  {
    title: "Cloud Fundamentals, Administration and Solution Architect",
    institution: "FIAP",
    category: "Cloud",
    date: "mar de 2025",
    image:
      "https://on.fiap.com.br/local/nanocourses/gerar_certificado.php?chave=b94f48aaf8c71fcb3a09f1e09be6a1a0&action=view",
    skills: ["Docker", "Kubernetes", "Azure", "Cloud"],
  },
  {
    title: "Curso de Domain Driven Design",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    image:
      "https://fullcycle.com.br/certificado/80807ee3-b904-45bd-97f4-5aabceb93eb0/",
    skills: ["DDD", "Design Patterns", "Arquitetura"],
  },
  {
    title: "Curso de Fundamentos da arquitetura de software",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    image:
      "https://fullcycle.com.br/certificado/38d1874f-8d4a-437a-88f0-ffacaa7ddd5d/",
    skills: ["Arquitetura", "Design Patterns", "Software"],
  },
  {
    title: "Curso de SOLID Express",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    image:
      "https://fullcycle.com.br/certificado/dc223ca6-0e39-4256-a9e1-06097ed8dd70/",
    skills: ["SOLID", "Clean Code", "Design Patterns"],
  },
  {
    title: "Front End",
    institution: "FIAP",
    category: "Programação",
    date: "out de 2024",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/127884/c9baf3dba0c39c0a056138b98861c0f1/certificado.png",
    skills: ["HTML5", "CSS", "JavaScript", "TypeScript", "Bootstrap", "Git"],
  },
  {
    title: "Códigos de Alta Performance",
    institution: "FIAP",
    category: "Programação",
    date: "jun de 2024",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/116819/ee8af00273cab61441b140d09779fa3e/certificado.png",
    skills: ["Estrutura de dados", "Algoritmos", "Otimização"],
  },
  {
    title: "Trilha Digital | Coders 24 | Back End",
    institution: "Ada",
    category: "Programação",
    date: "jun de 2024",
    image:
      "https://ada.tech/certificado?code=25043df1-f654-a145-fc88-da58ea25be08",
    skills: ["Java", "POO", "Design Patterns", "SQL", "Git", "Algoritmos"],
  },
  {
    title: "C++: Conhecendo a linguagem e a STL",
    institution: "Alura",
    category: "Programação",
    date: "fev de 2024",
    image: "/certificates/placeholder.jpg",
    skills: ["C++", "Algoritmos", "STL"],
  },
  {
    title: "Descubra a Inteligência Artificial Generativa",
    institution: "LinkedIn",
    category: "IA",
    date: "fev de 2024",
    image:
      "https://www.linkedin.com/learning/certificates/7f68b21780dd79257cf754b98bc7a1049db55ecb73f9812d6bd6961679ad8879?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BrfDGbhUUTL6SSoWjPSmsFQ%3D%3D",
    skills: ["IA Generativa", "Machine Learning", "AI"],
  },
  {
    title: "NLW Expert trilha de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "fev de 2024",
    image:
      "https://app.rocketseat.com.br/certificates/639b9be1-d05c-45c9-ae5d-8d2dba55ca1f",
    skills: ["Java", "Spring Boot", "APIs"],
  },
  {
    title: "Docker: criando e gerenciando containers",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    image:
      "https://cursos.alura.com.br/certificate/bbd9de09-c24a-46a7-a21c-f2d4a3d89a20",
    skills: ["Docker", "Containers", "DevOps"],
  },
  {
    title: "Kubernetes: Pods, Services e ConfigMaps",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    image:
      "https://cursos.alura.com.br/certificate/0e7c30a3-8445-462a-b706-b7d6aeed6c36",
    skills: ["Kubernetes", "Orquestração", "Containers"],
  },
  {
    title: "Curso de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "out de 2023",
    image:
      "https://app.rocketseat.com.br/certificates/45dd803f-867f-4429-b103-23a5a52b983c",
    skills: ["Java", "POO", "Backend"],
  },
  {
    title: "Java Development",
    institution: "FIAP",
    category: "Programação",
    date: "set de 2023",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/95237/a7474167931de5a10a6767e35da2e331/certificado.png",
    skills: ["Java", "Spring Boot", "APIs REST"],
  },
  {
    title: "Java Xpert",
    institution: "FIAP",
    category: "Programação",
    date: "set de 2023",
    image:
      "https://www2.fiap.com.br/inscricaoworkshopdobem/ImagemCertificado/54D78348-91A1-4C77-8725-07DF52D7FE51",
    skills: ["Java", "Spring Boot", "Azure", "HTML5", "CSS", "APIs"],
  },
  {
    title: "C#: criando sua primeira aplicação",
    institution: "Alura",
    category: "Programação",
    date: "ago de 2023",
    image:
      "https://cursos.alura.com.br/certificate/33a7a8f2-9dea-4eb8-8197-403b3f27d844",
    skills: ["C#", ".NET", "POO"],
  },
  {
    title: "Certificação Linux LPI Essentials parte 3: Command Line Basics",
    institution: "Alura",
    category: "Linux",
    date: "jul de 2023",
    image:
      "https://cursos.alura.com.br/certificate/54988775-52d5-4f9b-a487-6ece591a7c93",
    skills: ["Linux", "CLI", "Bash", "Shell"],
  },
  {
    title: "Git e GitHub: repositório, commit e versões",
    institution: "Alura",
    category: "DevOps",
    date: "jul de 2023",
    image:
      "https://cursos.alura.com.br/certificate/101521a2-995b-47f2-8d8e-842d07d97129",
    skills: ["Git", "GitHub", "Controle de versão"],
  },
  {
    title:
      "Certificação Linux LPI Essentials parte 2: Open Source Software and Licensing",
    institution: "Alura",
    category: "Linux",
    date: "jun de 2023",
    image:
      "https://cursos.alura.com.br/certificate/c5d15db0-931e-441d-b25b-3935d04dccf5",
    skills: ["Linux", "Open Source", "Licenciamento"],
  },
  {
    title: "DevOps",
    institution: "FIAP",
    category: "DevOps",
    date: "jun de 2023",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/87355/467234a44b4c74f50b84d79d9f5095be/certificado.png",
    skills: ["CI/CD", "Pipelines", "Automação"],
  },
  {
    title:
      "JavaScript e HTML: desenvolva um jogo e pratique lógica de programação",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    image:
      "https://cursos.alura.com.br/certificate/be369ed8-23ac-4a3d-81c1-7c9b9423ee8d",
    skills: ["JavaScript", "HTML", "Lógica"],
  },
  {
    title:
      "Lógica de programação: comece em lógica com o jogo Pong e JavaScript",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    image:
      "https://cursos.alura.com.br/certificate/5286eba3-fd0c-46a3-894a-7a7be18b2f37",
    skills: ["JavaScript", "Lógica", "Programação"],
  },
  {
    title: "Python: começando com a linguagem",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    image:
      "https://cursos.alura.com.br/certificate/34e8ac0a-42ad-4533-81c0-e37fe6111c30",
    skills: ["Python", "Programação", "Backend"],
  },
  {
    title:
      "Certificação Linux LPI Essentials parte 1: Evolution and Distributions",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    image:
      "https://cursos.alura.com.br/certificate/ef51fa14-5b34-417a-a0fe-ac458fd2da94",
    skills: ["Linux", "Distribuições", "Fundamentos"],
  },
  {
    title: "Hardening e Configuração de Servidores",
    institution: "FIAP",
    category: "Segurança",
    date: "abr de 2023",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/83095/fdac96446a907ca479913a082e7b6cd3/certificado.png",
    skills: ["Hardening", "Servidores", "Segurança"],
  },
  {
    title: "Linux I: conhecendo e utilizando o terminal",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    image:
      "https://cursos.alura.com.br/certificate/010a2830-6f55-475f-a6ef-6e3703d1fd66",
    skills: ["Linux", "Terminal", "CLI"],
  },
  {
    title: "Linux II: programas, processos e pacotes",
    institution: "Alura",
    category: "Linux",
    date: "mar de 2023",
    image:
      "https://cursos.alura.com.br/certificate/045fbddd-c77a-423c-b55b-2e3e318706c4",
    skills: ["Linux", "Processos", "Pacotes"],
  },
  {
    title: "Estruturas de Computadores",
    institution: "FIAP",
    category: "Fundamentos",
    date: "set de 2022",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/65025/b7bdd6e4a76f4b524d7c00bbdc2ce222/certificado.png",
    skills: ["Hardware", "Arquitetura", "Computadores"],
  },
  {
    title: "Algoritmos: Aprenda a programar",
    institution: "FIAP",
    category: "Programação",
    date: "ago de 2022",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/62853/d94f580b5afcd7bcd9a15aedf69d880e/certificado.png",
    skills: ["Algoritmos", "Java", "Lógica"],
  },
  {
    title: "Gestão de Infraestrutura de TI",
    institution: "FIAP",
    category: "Fundamentos",
    date: "ago de 2022",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/62453/3f6f10496f4683665c18b39c1067ce62/certificado.png",
    skills: ["Infraestrutura", "TI", "Gestão"],
  },
  {
    title: "Linux Fundamentos",
    institution: "FIAP",
    category: "Linux",
    date: "ago de 2022",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/62067/5727da5de4b04bb52e8823519458f675/certificado.png",
    skills: ["Linux", "Fundamentos", "CLI"],
  },
  {
    title: "Python",
    institution: "FIAP",
    category: "Programação",
    date: "ago de 2022",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/61534/66420de2a304617f2193a710a3bd0a7e/certificado.png",
    skills: ["Python", "Automação", "POO"],
  },
  {
    title: "Formação Social e Sustentabilidade",
    institution: "FIAP",
    category: "Fundamentos",
    date: "mar de 2022",
    image:
      "https://on.fiap.com.br/pluginfile.php/1/local_nanocourses/certificado_nanocourse/47361/43871aa363f1112fb169ddd13cabbc1b/certificado.png",
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

                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => window.open(cert.image, "_blank")}
                        className="flex-1 py-4 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-light hover:text-lorenzo-dark transition-all duration-300"
                      >
                        Ver Certificado
                      </button>
                      <button
                        onClick={() => setExpandedCert(null)}
                        className="flex-1 py-4 bg-lorenzo-light/5 text-lorenzo-light font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-light/10 transition-all duration-300"
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
