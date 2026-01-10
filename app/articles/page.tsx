"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  ArrowLeft,
  Tag,
  FileText,
  AlertCircle,
} from "lucide-react";
import { FormattedDate } from "@/components/formatted-date";
import { ArticlesGridSkeleton } from "@/components/article-skeleton";
import { ArticlesFilters } from "@/components/articles-filters";

interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  tags?: string[];
}

export default function ArticlesPage() {
  const [allArticles, setAllArticles] = useState<ArticleMetadata[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleMetadata[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Buscar todos os artigos uma vez no início
  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();

        if (data.success) {
          setAllArticles(data.data);
          setFilteredArticles(data.data);
        }
      } catch (error) {
        console.error("Erro ao buscar artigos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, []);

  // Filtrar artigos no lado do cliente
  useEffect(() => {
    let filtered = allArticles;

    if (searchQuery) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((article) =>
        selectedTags.every((selectedTag) =>
          article.tags?.includes(selectedTag),
        ),
      );
    }

    setFilteredArticles(filtered);
  }, [allArticles, searchQuery, selectedTags]);

  // Extrair todas as tags disponíveis
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allArticles.forEach((article) => {
      article.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [allArticles]);

  // Loading state
  if (loading && allArticles.length === 0) {
    return (
      <main className="min-h-screen bg-lorenzo-dark text-lorenzo-light relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(200, 245, 80, 0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
          {/* Header */}
          <div className="mb-16">
            <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1] mb-6">
              Artigos
              <br />
              <span className="text-lorenzo-accent font-brier italic">
                & Tutoriais
              </span>
            </h1>
            <p className="text-lorenzo-light/60 text-lg max-w-xl">
              Pensamentos, tutoriais e insights sobre desenvolvimento, segurança
              e tecnologia.
            </p>
          </div>

          <ArticlesGridSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-lorenzo-dark text-lorenzo-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(200, 245, 80, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lorenzo-light/40 hover:text-lorenzo-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-sm">
              Voltar para o início
            </span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Blog
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-lorenzo-light uppercase tracking-tight leading-[1.1]">
              Artigos
              <br />
              <span className="text-lorenzo-accent font-brier italic">
                & Tutoriais
              </span>
            </h1>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-lorenzo-accent" />
                <span className="text-lorenzo-light/60">
                  {allArticles.length}{" "}
                  {allArticles.length === 1 ? "artigo" : "artigos"}
                </span>
              </div>
              {availableTags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-lorenzo-accent" />
                  <span className="text-lorenzo-light/60">
                    {availableTags.length}{" "}
                    {availableTags.length === 1 ? "tag" : "tags"}
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="text-lorenzo-light/60 text-lg max-w-xl">
            Pensamentos, tutoriais e insights sobre desenvolvimento, segurança e
            tecnologia.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <ArticlesFilters
            onSearchChange={setSearchQuery}
            onTagsSelect={setSelectedTags}
            selectedTags={selectedTags}
            availableTags={availableTags}
          />
        </motion.div>

        {/* Results counter */}
        {(searchQuery || selectedTags.length > 0) && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lorenzo-accent/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-lorenzo-accent" />
              </div>
              <div>
                <p className="text-2xl font-black text-lorenzo-light">
                  {filteredArticles.length}
                </p>
                <p className="text-sm text-lorenzo-light/40">
                  {filteredArticles.length === 1
                    ? "Artigo encontrado"
                    : "Artigos encontrados"}
                </p>
              </div>
            </div>

            {filteredArticles.length < allArticles.length && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-lorenzo-light/40">Mostrando</span>
                <span className="px-3 py-1 bg-lorenzo-accent text-lorenzo-dark font-bold">
                  {filteredArticles.length} de {allArticles.length}
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-lorenzo-accent/10 mb-8">
                {searchQuery || selectedTags.length > 0 ? (
                  <AlertCircle className="w-10 h-10 text-lorenzo-accent" />
                ) : (
                  <FileText className="w-10 h-10 text-lorenzo-accent" />
                )}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4 text-lorenzo-light">
                {searchQuery || selectedTags.length > 0
                  ? "Nenhum artigo encontrado"
                  : "Nenhum artigo publicado ainda"}
              </h3>
              <p className="text-lorenzo-light/40 mb-8 max-w-md mx-auto">
                {searchQuery || selectedTags.length > 0
                  ? "Tente ajustar seus filtros de busca ou limpar os filtros para ver todos os artigos."
                  : "Volte em breve para conferir novos conteúdos sobre tecnologia e desenvolvimento!"}
              </p>
              {(searchQuery || selectedTags.length > 0) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTags([]);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lorenzo-accent text-lorenzo-dark font-bold uppercase tracking-wider text-sm hover:bg-lorenzo-light transition-all duration-300"
                >
                  Limpar filtros
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link
                    href={`/articles/${article.slug}`}
                    className="h-full block group"
                  >
                    <article className="h-full min-h-[320px] bg-lorenzo-light/5 p-6 hover:bg-lorenzo-accent transition-all duration-300 flex flex-col">
                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {article.date && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-lorenzo-accent bg-lorenzo-accent/10 px-2 py-1 group-hover:bg-lorenzo-dark/30 group-hover:text-lorenzo-dark transition-colors">
                            <Calendar className="w-3 h-3" />
                            <FormattedDate date={article.date} />
                          </div>
                        )}
                        {article.author && (
                          <span className="text-[10px] text-lorenzo-light/40 font-semibold uppercase tracking-wide group-hover:text-lorenzo-dark transition-colors">
                            {article.author}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-lorenzo-light mb-3 leading-tight group-hover:text-lorenzo-dark transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-lorenzo-light/50 leading-relaxed line-clamp-3 mb-4 flex-grow group-hover:text-lorenzo-dark transition-colors">
                        {article.description}
                      </p>

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-1 bg-lorenzo-light/5 text-lorenzo-light/50 font-semibold uppercase tracking-wide group-hover:bg-lorenzo-dark/20 group-hover:text-lorenzo-dark transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="text-[10px] px-2 py-1 text-lorenzo-light/30 font-semibold group-hover:text-lorenzo-dark transition-colors">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Read More */}
                      <div className="flex items-center gap-2 group-hover:text-black transition-colors mt-auto pt-4 border-t border-lorenzo-light/10 group-hover:border-lorenzo-dark/30">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Ler artigo
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lorenzo-light/40 hover:text-lorenzo-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-sm">
              Voltar para o início
            </span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
