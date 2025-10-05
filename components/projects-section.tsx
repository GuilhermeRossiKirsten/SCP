"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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

const getLanguageGradient = (language: string | null) => {
  const gradients: Record<string, string> = {
    JavaScript: "from-yellow-500 to-orange-500",
    TypeScript: "from-blue-500 to-cyan-500",
    Python: "from-green-500 to-teal-500",
    Java: "from-red-500 to-orange-500",
    "C++": "from-purple-500 to-pink-500",
    C: "from-gray-500 to-gray-700",
    Go: "from-cyan-500 to-blue-500",
    Rust: "from-orange-500 to-red-500",
    Ruby: "from-red-500 to-pink-500",
    PHP: "from-indigo-500 to-purple-500",
  };
  return gradients[language || ""] || "from-green-500 to-emerald-500";
};

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
        className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Projetos em Destaque
            </h2>
            <p className="text-gray-400 text-lg">
              Alguns dos meus trabalhos mais relevantes
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-green-400" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !projects) {
    return (
      <section
        id="projects"
        className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Projetos em Destaque
            </h2>
            <p className="text-gray-400 text-lg">
              Alguns dos meus trabalhos mais relevantes
            </p>
          </div>
          <div className="text-center text-red-400">
            <p>Erro ao carregar projetos. Tente novamente mais tarde.</p>
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
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Projetos em Destaque
          </h2>
          <p className="text-gray-400 text-lg">
            {projects.length} repositórios do GitHub • Mostrando{" "}
            {displayedProjects.length}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all h-full flex flex-col">
                <CardHeader>
                  <div
                    className={`w-full h-2 rounded-full bg-gradient-to-r ${getLanguageGradient(project.language)} mb-4`}
                  />
                  <CardTitle className="text-white text-lg">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                    {project.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${getLanguageGradient(project.language)}`}
                        />
                        {project.language}
                      </span>
                    )}
                    {project.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </span>
                    )}
                    {project.forks > 0 && (
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {project.forks}
                      </span>
                    )}
                  </div>

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs border border-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent"
                    asChild
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  {project.homepage && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
                      asChild
                    >
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => setDisplayCount((prev) => prev + 6)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-6 text-lg"
            >
              Carregar Mais Projetos ({projects.length - displayCount}{" "}
              restantes)
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
