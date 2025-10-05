"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Cloud,
  Shield,
  Database,
  GitBranch,
} from "lucide-react";

const skillCategories = [
  {
    title: "Linguagens",
    icon: Code2,
    skills: ["C++", "Golang", "Python", "Java", "JavaScript", "TypeScript"],
    color: "from-green-500 to-teal-500",
  },
  {
    title: "Frameworks",
    icon: Server,
    skills: ["React", "Next.js", "Spring", "Node.js"],
    color: "from-emerald-500 to-lime-500",
  },
  {
    title: "DevOps",
    icon: GitBranch,
    skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Cloud",
    icon: Cloud,
    skills: ["Azure", "Oracle Cloud", "AWS"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Segurança",
    icon: Shield,
    skills: ["Criptografia", "Certificados", "LGPD", "Hacking Ético"],
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Banco de Dados",
    icon: Database,
    skills: ["PostgreSQL", "Oracle DB", "MongoDB", "Redis"],
    color: "from-green-600 to-teal-600",
  },
];

export function SkillsSection() {
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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Habilidades Técnicas
          </h2>
          <p className="text-gray-400 text-lg">
            Tecnologias e ferramentas que domino
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
