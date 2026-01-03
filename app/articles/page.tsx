"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar, ArrowRight, Tag, FileText, AlertCircle } from "lucide-react";
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

  // Filtrar artigos no lado do cliente (evita requisições desnecessárias)
  useEffect(() => {
    let filtered = allArticles;

    // Filtrar por busca
    if (searchQuery) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filtrar por tags (deve ter TODAS as tags selecionadas)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((article) =>
        selectedTags.every((selectedTag) =>
          article.tags?.includes(selectedTag),
        ),
      );
    }

    setFilteredArticles(filtered);
  }, [allArticles, searchQuery, selectedTags]);

  // Extrair todas as tags disponíveis (sempre baseado em TODOS os artigos)
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    allArticles.forEach((article) => {
      article.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [allArticles]);

  // Loading state com skeleton
  if (loading && allArticles.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated background particles effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Artigos
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Pensamentos, tutoriais e insights sobre desenvolvimento, segurança
              e tecnologia.
            </p>
          </motion.div>

          <ArticlesGridSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        {/* Header - Centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
            Artigos
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Pensamentos, tutoriais e insights sobre desenvolvimento, segurança e
            tecnologia.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-400">
                {allArticles.length}{" "}
                {allArticles.length === 1 ? "artigo" : "artigos"}
              </span>
            </div>
            {availableTags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">
                  {availableTags.length}{" "}
                  {availableTags.length === 1 ? "tag" : "tags"}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Filters - Centralizado em um card destacado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
            <ArticlesFilters
              onSearchChange={setSearchQuery}
              onTagsSelect={setSelectedTags}
              selectedTags={selectedTags}
              availableTags={availableTags}
            />
          </div>
        </motion.div>

        {/* Results counter with better styling */}
        {(searchQuery || selectedTags.length > 0) && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center justify-between flex-wrap gap-4 px-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {filteredArticles.length}
                </p>
                <p className="text-sm text-gray-400">
                  {filteredArticles.length === 1
                    ? "Artigo encontrado"
                    : "Artigos encontrados"}
                </p>
              </div>
            </div>

            {filteredArticles.length < allArticles.length && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Mostrando</span>
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 font-semibold">
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
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-8 border border-green-500/20">
                {searchQuery || selectedTags.length > 0 ? (
                  <AlertCircle className="w-10 h-10 text-green-400" />
                ) : (
                  <FileText className="w-10 h-10 text-green-400" />
                )}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {searchQuery || selectedTags.length > 0
                  ? "Nenhum artigo encontrado"
                  : "Nenhum artigo publicado ainda"}
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto text-base">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30"
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
              className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
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
                    className="h-full block"
                  >
                    <Card className="h-full min-h-[420px] transition-all duration-300 hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-1 cursor-pointer group bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm border-zinc-800 flex flex-col">
                      <CardHeader className="space-y-4 pb-4 flex-shrink-0">
                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          {article.date && (
                            <div className="flex items-center gap-1.5 bg-green-500/5 px-2.5 py-1.5 rounded-md border border-green-500/10">
                              <Calendar className="w-3 h-3 text-green-400" />
                              <FormattedDate date={article.date} />
                            </div>
                          )}
                          {article.author && (
                            <span className="text-gray-500 font-medium">
                              {article.author}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <CardTitle className="text-xl md:text-2xl group-hover:text-green-400 transition-colors leading-tight font-bold line-clamp-2 min-h-[3.5rem]">
                          {article.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex flex-col flex-grow pt-0 pb-6">
                        <div className="space-y-4 flex-grow">
                          {/* Description */}
                          <CardDescription className="text-sm leading-relaxed line-clamp-3 text-gray-400 min-h-[4rem]">
                            {article.description}
                          </CardDescription>

                          {/* Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 min-h-[2rem] content-start">
                              {article.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-md border border-green-500/20 h-fit"
                                >
                                  <Tag className="w-2.5 h-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {article.tags.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 text-gray-500 text-xs font-medium h-fit">
                                  +{article.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Read More Link - Always at bottom */}
                        <div className="flex items-center gap-2 text-green-400 group-hover:gap-3 transition-all pt-6 mt-auto border-t border-zinc-800 flex-shrink-0">
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            Ler artigo
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
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
          className="mt-24 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Voltar para o início</span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
