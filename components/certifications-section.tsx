"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

const certifications = [
  {
    title: "Go: a linguagem do Google",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2025",
    credential: "c0d7df2c-5836-4005-85b2-d1f4934688d6",
  },
  {
    title: "Cloud Fundamentals, Administration and Solution Architect",
    institution: "FIAP",
    category: "Cloud Computing",
    date: "mar de 2025",
    credential: "b94f48aaf8c71fcb3a09f1e09be6a1a0",
    skills: ["Docker", "Kubernetes", "Azure"],
  },
  {
    title: "Curso de Domain Driven Design",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    credential: "80807ee3-b904-45bd-97f4-5aabceb93eb0",
  },
  {
    title: "Curso de Fundamentos da arquitetura de software",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    credential: "38d1874f-8d4a-437a-88f0-ffacaa7ddd5d",
  },
  {
    title: "Curso de SOLID Express",
    institution: "Full Cycle",
    category: "Arquitetura",
    date: "fev de 2025",
    credential: "dc223ca6-0e39-4256-a9e1-06097ed8dd70",
  },
  {
    title: "Front End",
    institution: "FIAP",
    category: "Programação",
    date: "out de 2024",
    credential: "c9baf3dba0c39c0a056138b98861c0f1",
    skills: ["HTML5", "CSS", "JavaScript", "TypeScript", "Bootstrap", "Git"],
  },
  {
    title: "Códigos de Alta Performance",
    institution: "FIAP",
    category: "Programação",
    date: "jun de 2024",
    credential: "ee8af00273cab61441b140d09779fa3e",
  },
  {
    title: "Trilha Digital | Coders 24 | Back End",
    institution: "Ada",
    category: "Programação",
    date: "jun de 2024",
    credential: "25043df1-f654-a145-fc88-da58ea25be08",
    skills: ["Java", "POO", "Design Patterns", "SQL", "Algoritmos"],
  },
  {
    title: "C++: Conhecendo a linguagem e a STL",
    institution: "Alura",
    category: "Programação",
    date: "fev de 2024",
    credential: "e0bd4b60-5cf6-4d8a-8960-da98da757562",
  },
  {
    title: "Descubra a Inteligência Artificial Generativa",
    institution: "LinkedIn",
    category: "IA",
    date: "fev de 2024",
  },
  {
    title: "NLW Expert trilha de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "fev de 2024",
    credential: "639b9be1-d05c-45c9-ae5d-8d2dba55ca1f",
    skills: ["Java"],
  },
  {
    title: "Docker: criando e gerenciando containers",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    credential: "bbd9de09-c24a-46a7-a21c-f2d4a3d89a20",
  },
  {
    title: "Kubernetes: Pods, Services e ConfigMaps",
    institution: "Alura",
    category: "DevOps",
    date: "jan de 2024",
    credential: "0e7c30a3-8445-462a-b706-b7d6aeed6c36",
  },
  {
    title: "Curso de Java",
    institution: "Rocketseat",
    category: "Programação",
    date: "out de 2023",
    credential: "45dd803f-867f-4429-b103-23a5a52b983c",
    skills: ["Java"],
  },
  {
    title: "Java Development",
    institution: "FIAP",
    category: "Programação",
    date: "set de 2023",
    credential: "a7474167931de5a10a6767e35da2e331",
    skills: ["Java"],
  },
  {
    title: "Java Xpert",
    institution: "FIAP",
    category: "Programação",
    date: "set de 2023",
    credential: "54D78348-91A1-4C77-8725-07DF52D7FE51",
    skills: ["Java", "Spring Boot", "Oracle", "Azure DevOps"],
  },
  {
    title: "C#: criando sua primeira aplicação",
    institution: "Alura",
    category: "Programação",
    date: "ago de 2023",
    credential: "33a7a8f2-9dea-4eb8-8197-403b3f27d844",
  },
  {
    title: "Certificação Linux LPI Essentials parte 3: Command Line Basics",
    institution: "Alura",
    category: "Linux",
    date: "jul de 2023",
    credential: "54988775-52d5-4f9b-a487-6ece591a7c93",
  },
  {
    title: "Git e GitHub: repositório, commit e versões",
    institution: "Alura",
    category: "DevOps",
    date: "jul de 2023",
    credential: "101521a2-995b-47f2-8d8e-842d07d97129",
  },
  {
    title: "Certificação Linux LPI Essentials parte 2: Open Source Software",
    institution: "Alura",
    category: "Linux",
    date: "jun de 2023",
    credential: "c5d15db0-931e-441d-b25b-3935d04dccf5",
  },
  {
    title: "DevOps",
    institution: "FIAP",
    category: "DevOps",
    date: "jun de 2023",
    credential: "467234a44b4c74f50b84d79d9f5095be",
  },
  {
    title: "JavaScript e HTML: desenvolva um jogo e pratique lógica",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    credential: "be369ed8-23ac-4a3d-81c1-7c9b9423ee8d",
  },
  {
    title: "Lógica de programação: comece em lógica com o jogo Pong",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    credential: "5286eba3-fd0c-46a3-894a-7a7be18b2f37",
  },
  {
    title: "Python: começando com a linguagem",
    institution: "Alura",
    category: "Programação",
    date: "mai de 2023",
    credential: "34e8ac0a-42ad-4533-81c0-e37fe6111c30",
  },
  {
    title:
      "Certificação Linux LPI Essentials parte 1: Evolution and Distributions",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    credential: "ef51fa14-5b34-417a-a0fe-ac458fd2da94",
  },
  {
    title: "Hardening e Configuração de Servidores",
    institution: "FIAP",
    category: "DevOps",
    date: "abr de 2023",
    credential: "fdac96446a907ca479913a082e7b6cd3",
  },
  {
    title: "Linux I: conhecendo e utilizando o terminal",
    institution: "Alura",
    category: "Linux",
    date: "abr de 2023",
    credential: "010a2830-6f55-475f-a6ef-6e3703d1fd66",
  },
  {
    title: "Linux II: programas, processos e pacotes",
    institution: "Alura",
    category: "Linux",
    date: "mar de 2023",
    credential: "045fbddd-c77a-423c-b55b-2e3e318706c4",
  },
  {
    title: "Lei Geral de Proteção de Dados (LGPD)",
    institution: "Fundação Bradesco",
    category: "Segurança",
    date: "out de 2022",
    credential: "6750276A-8FC4-4E21-B0CA-44COC7E8BFEA",
  },
  {
    title: "Estruturas de Computadores",
    institution: "FIAP",
    category: "Fundamentos",
    date: "set de 2022",
    credential: "b7bdd6e4a76f4b524d7c00bbdc2ce222",
  },
  {
    title: "Algoritmos: Aprenda a programar",
    institution: "FIAP",
    category: "Fundamentos",
    date: "ago de 2022",
    credential: "d94f580b5afcd7bcd9a15aedf69d880e",
    skills: ["Java"],
  },
  {
    title: "Gestão de Infraestrutura de TI",
    institution: "FIAP",
    category: "Gestão",
    date: "ago de 2022",
    credential: "3f6f10496f4683665c18b39c1067ce62",
  },
  {
    title: "Linux Fundamentos",
    institution: "FIAP",
    category: "Linux",
    date: "ago de 2022",
    credential: "5727da5de4b04bb52e8823519458f675",
  },
  {
    title: "Python",
    institution: "FIAP",
    category: "Programação",
    date: "ago de 2022",
    credential: "66420de2a304617f2193a710a3bd0a7e",
    skills: ["Python"],
  },
  {
    title: "Formação Social e Sustentabilidade",
    institution: "FIAP",
    category: "Gestão",
    date: "mar de 2022",
    credential: "43871aa363f1112fb169ddd13cabbc1b",
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
              key={cert.credential || cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
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
                  <ExternalLink className="w-4 h-4" />
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
    </section>
  );
}
