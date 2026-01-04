"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { FormattedDate } from "@/components/formatted-date";
import { useEffect } from "react";
import "./article-styles.css";
import "./prism-theme.css";

interface Article {
  slug: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  content: string;
}

interface ArticleContentProps {
  article: Article;
  htmlContent: string;
  readingTime: number;
}

export default function ArticleContent({
  article,
  htmlContent,
  readingTime,
}: ArticleContentProps) {
  useEffect(() => {
    // Add copy buttons to all code blocks
    const codeBlocks = document.querySelectorAll(".code-block");

    codeBlocks.forEach((block) => {
      // Check if buttons already exist
      if (block.querySelector(".copy-button")) return;

      const code = block.getAttribute("data-code") || "";

      // Create copy button
      const button = document.createElement("button");
      button.className =
        "copy-button absolute top-12 right-3 z-10 px-3 py-2 bg-lorenzo-dark/90 border border-lorenzo-accent/20 text-lorenzo-light/60 hover:text-lorenzo-accent hover:bg-lorenzo-accent/10 hover:border-lorenzo-accent/40 transition-all opacity-60 hover:opacity-100 backdrop-blur-sm flex items-center gap-2";
      button.title = "Copiar código";
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon hidden">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="copy-text text-xs font-semibold">Copiar</span>
      `;

      const handleCopy = async () => {
        const decodedCode = code
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&");

        await navigator.clipboard.writeText(decodedCode);

        const copyIcon = button.querySelector(".copy-icon");
        const checkIcon = button.querySelector(".check-icon");
        const copyText = button.querySelector(".copy-text");

        if (copyIcon && checkIcon) {
          copyIcon.classList.add("hidden");
          checkIcon.classList.remove("hidden");
          button.classList.add(
            "!text-lorenzo-accent",
            "!border-lorenzo-accent",
            "!bg-lorenzo-accent/20",
          );

          if (copyText) {
            copyText.textContent = "Copiado!";
          }

          setTimeout(() => {
            copyIcon.classList.remove("hidden");
            checkIcon.classList.add("hidden");
            button.classList.remove(
              "!text-lorenzo-accent",
              "!border-lorenzo-accent",
              "!bg-lorenzo-accent/20",
            );
            if (copyText) {
              copyText.textContent = "Copiar";
            }
          }, 2000);
        }
      };

      button.addEventListener("click", handleCopy);
      block.appendChild(button);
    });
  }, []);

  return (
    <main className="min-h-screen bg-lorenzo-dark text-lorenzo-light relative">
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

      <article className="max-w-[52rem] mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-lorenzo-light/40 hover:text-lorenzo-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wider">
              Voltar para artigos
            </span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 pb-10 border-b border-lorenzo-light/10"
        >
          <span className="text-lorenzo-accent text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
            Artigo
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-8 tracking-tight text-lorenzo-light uppercase">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            {article.date && (
              <div className="flex items-center gap-2 bg-lorenzo-accent/10 px-3 py-1.5 text-lorenzo-accent text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <FormattedDate date={article.date} />
              </div>
            )}
            {article.author && (
              <div className="flex items-center gap-2 bg-lorenzo-light/5 px-3 py-1.5 text-lorenzo-light/60 text-xs font-bold uppercase tracking-wider">
                <User className="w-3.5 h-3.5" />
                <span>{article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-lorenzo-light/5 px-3 py-1.5 text-lorenzo-light/60 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime} min de leitura</span>
            </div>
          </div>

          {article.description && (
            <p className="mt-8 text-lg text-lorenzo-light/60 leading-relaxed border-l-2 border-lorenzo-accent/30 pl-6">
              {article.description}
            </p>
          )}
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="article-content prose prose-invert max-w-none
            [&>*]:max-w-none
            
            /* Headings */
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-lorenzo-light prose-headings:scroll-mt-24
            prose-h1:hidden
            prose-h2:text-[1.875rem] prose-h2:leading-[1.2] prose-h2:mb-8 prose-h2:mt-16 prose-h2:text-lorenzo-accent prose-h2:font-black prose-h2:uppercase prose-h2:relative prose-h2:group
            prose-h3:text-[1.5rem] prose-h3:leading-[1.3] prose-h3:mb-6 prose-h3:mt-12 prose-h3:text-lorenzo-light prose-h3:font-bold
            prose-h4:text-[1.25rem] prose-h4:leading-[1.4] prose-h4:mb-4 prose-h4:mt-10 prose-h4:text-lorenzo-light/90 prose-h4:font-semibold
            prose-h5:text-[1.125rem] prose-h5:leading-[1.5] prose-h5:mb-3 prose-h5:mt-8 prose-h5:text-lorenzo-light/80 prose-h5:font-semibold
            prose-h6:text-[1rem] prose-h6:leading-[1.5] prose-h6:mb-2 prose-h6:mt-6 prose-h6:text-lorenzo-light/70 prose-h6:font-semibold prose-h6:uppercase prose-h6:tracking-wide
            
            /* Paragraphs */
            prose-p:text-[1.0625rem] prose-p:leading-[1.8] prose-p:text-lorenzo-light/70 prose-p:mb-6 prose-p:font-light prose-p:tracking-wide
            prose-p:first-of-type:text-lorenzo-light/80 prose-p:first-of-type:text-[1.125rem]
            
            /* Links */
            prose-a:text-lorenzo-accent prose-a:no-underline prose-a:font-medium prose-a:border-b-2 prose-a:border-lorenzo-accent/30 
            hover:prose-a:border-lorenzo-accent hover:prose-a:text-lorenzo-light prose-a:transition-all prose-a:duration-200
            prose-a:inline-flex prose-a:items-center prose-a:gap-1
            
            /* Emphasis */
            prose-strong:text-lorenzo-light prose-strong:font-bold prose-strong:tracking-tight
            prose-em:text-lorenzo-light/90 prose-em:italic prose-em:font-normal
            
            /* Inline Code */
            [&_.inline-code]:text-lorenzo-accent [&_.inline-code]:bg-lorenzo-light/5 [&_.inline-code]:border [&_.inline-code]:border-lorenzo-accent/20 
            [&_.inline-code]:px-[0.4em] [&_.inline-code]:py-[0.2em] [&_.inline-code]:text-[0.9em] 
            [&_.inline-code]:font-mono [&_.inline-code]:font-medium
            [&_.inline-code]:whitespace-nowrap [&_.inline-code]:align-middle
            
            /* Code Blocks */
            [&_.code-block]:bg-[#0d1117] [&_.code-block]:border [&_.code-block]:border-lorenzo-accent/10 
            [&_.code-block]:overflow-hidden [&_.code-block]:shadow-2xl 
            [&_.code-block]:shadow-black/50 [&_.code-block]:my-8 [&_.code-block]:backdrop-blur-sm
            [&_.code-block]:relative [&_.code-block]:group
            
            /* Code Block Header */
            [&_.code-block]:before:content-[attr(data-language)] [&_.code-block]:before:absolute 
            [&_.code-block]:before:top-0 [&_.code-block]:before:right-0 [&_.code-block]:before:px-4 
            [&_.code-block]:before:py-2 [&_.code-block]:before:text-xs [&_.code-block]:before:font-mono 
            [&_.code-block]:before:text-lorenzo-light/40 [&_.code-block]:before:uppercase 
            [&_.code-block]:before:tracking-wider [&_.code-block]:before:bg-black/30
            [&_.code-block]:before:border-l [&_.code-block]:before:border-b
            [&_.code-block]:before:border-lorenzo-accent/10
            
            [&_.code-block>code]:block [&_.code-block>code]:p-6 [&_.code-block>code]:pt-12
            [&_.code-block>code]:text-[0.925rem] [&_.code-block>code]:text-lorenzo-light/80 
            [&_.code-block>code]:leading-relaxed [&_.code-block>code]:font-normal
            [&_.code-block>code]:overflow-x-auto [&_.code-block>code]:font-mono
            
            /* Lists */
            prose-ul:my-8 prose-ul:space-y-3 prose-ul:text-lorenzo-light/70 prose-ul:pl-6
            prose-ol:my-8 prose-ol:space-y-3 prose-ol:text-lorenzo-light/70 prose-ol:pl-6
            prose-li:text-[1.0625rem] prose-li:leading-[1.8] prose-li:pl-2 prose-li:text-lorenzo-light/70 prose-li:font-light
            prose-li>p:my-0 prose-li>p:leading-[1.8]
            prose-ul>li:marker:text-lorenzo-accent prose-ul>li:marker:text-lg prose-ul>li:marker:font-bold
            prose-ol>li:marker:text-lorenzo-accent prose-ol>li:marker:font-bold prose-ol>li:marker:text-base
            prose-li>ul:mt-3 prose-li>ol:mt-3 prose-li>ul:mb-0 prose-li>ol:mb-0
            
            /* Nested Lists */
            prose-li>ul>li:text-lorenzo-light/60 prose-li>ol>li:text-lorenzo-light/60
            
            /* Blockquotes */
            prose-blockquote:border-l-[3px] prose-blockquote:border-lorenzo-accent prose-blockquote:pl-6 
            prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:not-italic 
            prose-blockquote:text-lorenzo-light/70 prose-blockquote:bg-lorenzo-accent/5
            prose-blockquote:backdrop-blur-sm prose-blockquote:shadow-lg prose-blockquote:shadow-lorenzo-accent/5
            prose-blockquote:relative prose-blockquote:font-normal prose-blockquote:text-[1.0625rem]
            prose-blockquote:leading-[1.8]
            
            /* Images */
            [&_.image-wrapper]:my-10 [&_.image-wrapper]:block [&_.image-wrapper]:text-center
            [&_.image-wrapper>img]:shadow-2xl 
            [&_.image-wrapper>img]:shadow-black/50 [&_.image-wrapper>img]:border 
            [&_.image-wrapper>img]:border-lorenzo-accent/10 [&_.image-wrapper>img]:mx-auto
            [&_.image-wrapper>img]:max-w-full [&_.image-wrapper>img]:h-auto
            [&_.image-wrapper>figcaption]:mt-4 [&_.image-wrapper>figcaption]:text-sm 
            [&_.image-wrapper>figcaption]:text-lorenzo-light/40 [&_.image-wrapper>figcaption]:italic
            [&_.image-wrapper>figcaption]:empty:hidden
            
            /* Horizontal Rules */
            prose-hr:border-lorenzo-accent/20 prose-hr:my-16 prose-hr:border-t-2 prose-hr:border-dashed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Footer Navigation */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-lorenzo-light/10"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-lorenzo-accent hover:text-lorenzo-light transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-sm">
              Ver todos os artigos
            </span>
          </Link>
        </motion.footer>
      </article>
    </main>
  );
}
