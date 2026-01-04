"use client";

import { motion } from "framer-motion";
import { Github, Star, GitFork, Loader2, ArrowUpRight } from "lucide-react";
import useSWR from "swr";
import { useState } from "react";

interface GitHubProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  updated_at: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProjectsSection() {
  const [displayCount, setDisplayCount] = useState(6);

  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<GitHubProject[]>("/api/github/repos", fetcher);

  if (isLoading) {
    return (
      <section
        id="projects"
        data-theme="dark"
        className="py-24 md:py-32 px-6 md:px-12 bg-[#0f0f10]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
              Portfólio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
              Projetos
              <br />
              <span className="text-lorenzo-accent font-brier italic">
                Selecionados
              </span>
            </h2>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-lorenzo-accent" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !projects) {
    return (
      <section
        id="projects"
        data-theme="dark"
        className="py-24 md:py-32 px-6 md:px-12 bg-[#0f0f10]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
              Portfólio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
              Projetos
              <br />
              <span className="text-lorenzo-accent font-brier italic">
                Selecionados
              </span>
            </h2>
          </div>
          <div className="text-center py-20 border-dashed">
            <p className="text-lorenzo-light/60">
              Erro ao carregar projetos. Tente novamente mais tarde.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayedProjects = projects.slice(0, displayCount);
  const hasMore = displayCount < projects.length;

  return (
    <section
      id="projects"
      data-theme="dark"
      className="py-24 md:py-32 px-6 md:px-12 bg-[#0f0f10]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Portfólio
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
              Projetos
              <br />
              <span className="text-lorenzo-accent font-brier italic">
                Selecionados
              </span>
            </h2>
            <p className="text-lorenzo-light/60 text-sm tracking-wide">
              {projects.length} repositórios • {displayedProjects.length}{" "}
              exibidos
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full bg-lorenzo-light/5 p-6 flex flex-col hover:bg-lorenzo-light/[0.07] transition-all duration-300">
                {/* Index */}
                <span className="absolute top-4 right-4 text-xs font-bold text-lorenzo-light/20">
                  0{index + 1}
                </span>

                {/* Language Badge */}
                {project.language && (
                  <div className="inline-flex items-center gap-2 mb-4 w-fit">
                    <span className="w-2 h-2 bg-lorenzo-accent" />
                    <span className="text-xs font-bold uppercase tracking-wider text-lorenzo-accent">
                      {project.language}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold uppercase tracking-wide text-lorenzo-light mb-3 group-hover:text-lorenzo-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-lorenzo-light/60 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                  {project.description || "Sem descrição disponível"}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-5 text-sm">
                  {project.stars > 0 && (
                    <span className="flex items-center gap-1 text-lorenzo-light/40">
                      <Star size={14} />
                      {project.stars}
                    </span>
                  )}
                  {project.forks > 0 && (
                    <span className="flex items-center gap-1 text-lorenzo-light/40">
                      <GitFork size={14} />
                      {project.forks}
                    </span>
                  )}
                </div>

                {/* Tags */}
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-lorenzo-light/5 text-lorenzo-light/50 text-xs uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-lorenzo-light/10 text-lorenzo-light font-bold uppercase text-xs tracking-wider px-4 py-3 hover:bg-lorenzo-accent hover:text-black transition-colors duration-300"
                  >
                    <Github size={16} />
                    Código
                  </motion.a>
                  {project.homepage && (
                    <motion.a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 bg-lorenzo-light/10 text-lorenzo-light font-bold uppercase px-6 py-3 text-sm tracking-wider hover:bg-lorenzo-accent hover:text-black transition-colors duration-300"
                    >
                      <ArrowUpRight size={16} />
                      Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              onClick={() => setDisplayCount((prev) => prev + 6)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider px-8 py-4 text-sm hover:bg-lorenzo-light hover:text-lorenzo-dark transition-colors duration-300"
            >
              Carregar Mais
              <span className="text-lorenzo-dark/60">
                +{projects.length - displayCount}
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
