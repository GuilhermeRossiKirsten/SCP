"use client";

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
    skills: ["C++", "Golang", "C#", "TypeScript"],
    featured: false,
  },
  {
    title: "Frameworks",
    icon: Server,
    skills: ["React", "Next.js", "Spring", "Node.js"],
    featured: false,
  },
  {
    title: "DevOps",
    icon: GitBranch,
    skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions"],
    featured: false,
  },
  {
    title: "Cloud",
    icon: Cloud,
    skills: ["Azure", "Oracle Cloud", "AWS"],
    featured: false,
  },
  {
    title: "Segurança",
    icon: Shield,
    skills: ["Criptografia", "Certificados", "LGPD", "Hacking Ético"],
    featured: false,
  },
  {
    title: "Banco de Dados",
    icon: Database,
    skills: ["PostgreSQL", "Oracle DB", "MongoDB", "Redis"],
    featured: false,
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      data-theme="dark"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-[#0f0f10]"
    >
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lorenzo-accent/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
            Stack
            <br />
            <span className="text-lorenzo-accent font-brier italic">
              Tecnológica
            </span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`group relative p-6 transition-all duration-300 cursor-default ${
                category.featured
                  ? "bg-lorenzo-accent"
                  : "bg-lorenzo-light/5 hover:bg-lorenzo-light/10"
              }`}
            >
              {/* Index number */}
              <span
                className={`absolute top-4 right-4 text-xs font-bold tracking-wider ${
                  category.featured
                    ? "text-lorenzo-dark/40"
                    : "text-lorenzo-light/20"
                }`}
              >
                0{index + 1}
              </span>

              {/* Icon */}
              <div
                className={`w-14 h-14 flex items-center justify-center mb-5 ${
                  category.featured
                    ? "bg-lorenzo-dark/10"
                    : "bg-lorenzo-accent/10 group-hover:bg-lorenzo-accent/20"
                } transition-colors duration-300`}
              >
                <category.icon
                  size={28}
                  className={
                    category.featured
                      ? "text-lorenzo-dark"
                      : "text-lorenzo-accent"
                  }
                />
              </div>

              {/* Title */}
              <h3
                className={`text-xl font-bold uppercase tracking-wide mb-4 ${
                  category.featured ? "text-lorenzo-dark" : "text-lorenzo-light"
                }`}
              >
                {category.title}
              </h3>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      category.featured
                        ? "bg-lorenzo-dark/10 text-lorenzo-dark"
                        : "bg-lorenzo-light/5 text-lorenzo-light/60 group-hover:bg-lorenzo-accent/20 group-hover:text-lorenzo-accent"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
