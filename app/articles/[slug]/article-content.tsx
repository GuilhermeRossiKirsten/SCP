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

      // Create copy button (icon + text)
      const button = document.createElement("button");
      button.className =
        "copy-button absolute top-12 right-3 z-10 px-3 py-2 rounded-lg bg-zinc-900/90 border border-green-500/20 text-gray-400 hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/40 transition-all opacity-60 hover:opacity-100 backdrop-blur-sm flex items-center gap-2";
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
          // Change to success state
          copyIcon.classList.add("hidden");
          checkIcon.classList.remove("hidden");
          button.classList.add(
            "!text-green-400",
            "!border-green-500",
            "!bg-green-500/20",
          );

          if (copyText) {
            copyText.textContent = "Copiado!";
          }

          // Reset after 2 seconds
          setTimeout(() => {
            copyIcon.classList.remove("hidden");
            checkIcon.classList.add("hidden");
            button.classList.remove(
              "!text-green-400",
              "!border-green-500",
              "!bg-green-500/20",
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
    <main className="min-h-screen bg-black text-white relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <article className="container mx-auto px-4 py-24 max-w-[52rem] relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar para artigos</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 pb-10 border-b border-primary/10"
        >
          <h1 className="text-[2.5rem] md:text-[3rem] font-extrabold leading-tight mb-8 tracking-tight text-white">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
            {article.date && (
              <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <FormattedDate date={article.date} />
              </div>
            )}
            {article.author && (
              <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                <User className="w-3.5 h-3.5 text-primary" />
                <span>{article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{readingTime} min de leitura</span>
            </div>
          </div>

          {article.description && (
            <p className="mt-8 text-[1.125rem] text-gray-400 leading-relaxed font-light italic border-l-2 border-primary/30 pl-6">
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
            
            /* Headings - Obsidian Style com anchors */
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-headings:scroll-mt-24
            prose-h1:hidden
            prose-h2:text-[1.875rem] prose-h2:leading-[1.2] prose-h2:mb-8 prose-h2:mt-16 prose-h2:text-primary prose-h2:font-extrabold prose-h2:relative prose-h2:group
            prose-h3:text-[1.5rem] prose-h3:leading-[1.3] prose-h3:mb-6 prose-h3:mt-12 prose-h3:text-white prose-h3:font-bold
            prose-h4:text-[1.25rem] prose-h4:leading-[1.4] prose-h4:mb-4 prose-h4:mt-10 prose-h4:text-gray-200 prose-h4:font-semibold
            prose-h5:text-[1.125rem] prose-h5:leading-[1.5] prose-h5:mb-3 prose-h5:mt-8 prose-h5:text-gray-300 prose-h5:font-semibold
            prose-h6:text-[1rem] prose-h6:leading-[1.5] prose-h6:mb-2 prose-h6:mt-6 prose-h6:text-gray-400 prose-h6:font-semibold prose-h6:uppercase prose-h6:tracking-wide
            
            /* Paragraphs - Optimal Reading */
            prose-p:text-[1.0625rem] prose-p:leading-[1.8] prose-p:text-gray-300 prose-p:mb-6 prose-p:font-light prose-p:tracking-wide
            prose-p:first-of-type:text-gray-200 prose-p:first-of-type:text-[1.125rem]
            
            /* Links - Interactive & Accessible */
            prose-a:text-primary prose-a:no-underline prose-a:font-medium prose-a:border-b-2 prose-a:border-primary/30 
            hover:prose-a:border-primary hover:prose-a:text-accent prose-a:transition-all prose-a:duration-200
            prose-a:inline-flex prose-a:items-center prose-a:gap-1
            
            /* Emphasis - Clear Hierarchy */
            prose-strong:text-white prose-strong:font-bold prose-strong:tracking-tight
            prose-em:text-gray-100 prose-em:italic prose-em:font-normal
            
            /* Inline Code - Modern Terminal Style */
            [&_.inline-code]:text-accent [&_.inline-code]:bg-[#1a1a1a] [&_.inline-code]:border [&_.inline-code]:border-primary/20 
            [&_.inline-code]:px-[0.4em] [&_.inline-code]:py-[0.2em] [&_.inline-code]:rounded-md [&_.inline-code]:text-[0.9em] 
            [&_.inline-code]:font-mono [&_.inline-code]:font-medium [&_.inline-code]:shadow-sm
            [&_.inline-code]:whitespace-nowrap [&_.inline-code]:align-middle
            
            /* Code Blocks - Editor-like Experience */
            [&_.code-block]:bg-[#0d1117] [&_.code-block]:border [&_.code-block]:border-primary/10 
            [&_.code-block]:rounded-xl [&_.code-block]:overflow-hidden [&_.code-block]:shadow-2xl 
            [&_.code-block]:shadow-black/50 [&_.code-block]:my-8 [&_.code-block]:backdrop-blur-sm
            [&_.code-block]:relative [&_.code-block]:group
            
            /* Code Block Header with Language */
            [&_.code-block]:before:content-[attr(data-language)] [&_.code-block]:before:absolute 
            [&_.code-block]:before:top-0 [&_.code-block]:before:right-0 [&_.code-block]:before:px-4 
            [&_.code-block]:before:py-2 [&_.code-block]:before:text-xs [&_.code-block]:before:font-mono 
            [&_.code-block]:before:text-gray-500 [&_.code-block]:before:uppercase 
            [&_.code-block]:before:tracking-wider [&_.code-block]:before:bg-black/30
            [&_.code-block]:before:border-l [&_.code-block]:before:border-b
            [&_.code-block]:before:border-primary/10 [&_.code-block]:before:rounded-bl-lg
            
            [&_.code-block>code]:block [&_.code-block>code]:p-6 [&_.code-block>code]:pt-12
            [&_.code-block>code]:text-[0.925rem] [&_.code-block>code]:text-gray-200 
            [&_.code-block>code]:leading-relaxed [&_.code-block>code]:font-normal
            [&_.code-block>code]:overflow-x-auto [&_.code-block>code]:font-mono
            
            /* Custom Scrollbar for Code */
            [&_.code-block>code]:scrollbar-thin [&_.code-block>code]:scrollbar-track-transparent 
            [&_.code-block>code]:scrollbar-thumb-primary/20 hover:[&_.code-block>code]:scrollbar-thumb-primary/40
            
            /* Lists - Clear & Organized */
            prose-ul:my-8 prose-ul:space-y-3 prose-ul:text-gray-300 prose-ul:pl-6
            prose-ol:my-8 prose-ol:space-y-3 prose-ol:text-gray-300 prose-ol:pl-6
            prose-li:text-[1.0625rem] prose-li:leading-[1.8] prose-li:pl-2 prose-li:text-gray-300 prose-li:font-light
            prose-li>p:my-0 prose-li>p:leading-[1.8]
            prose-ul>li:marker:text-primary prose-ul>li:marker:text-lg prose-ul>li:marker:font-bold
            prose-ol>li:marker:text-primary prose-ol>li:marker:font-bold prose-ol>li:marker:text-base
            prose-li>ul:mt-3 prose-li>ol:mt-3 prose-li>ul:mb-0 prose-li>ol:mb-0
            
            /* Nested Lists */
            prose-li>ul>li:text-gray-400 prose-li>ol>li:text-gray-400
            
            /* Blockquotes - Callout Style */
            prose-blockquote:border-l-[3px] prose-blockquote:border-primary prose-blockquote:pl-6 
            prose-blockquote:pr-6 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:not-italic 
            prose-blockquote:text-gray-300 prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-lg 
            prose-blockquote:backdrop-blur-sm prose-blockquote:shadow-lg prose-blockquote:shadow-primary/5
            prose-blockquote:relative prose-blockquote:font-normal prose-blockquote:text-[1.0625rem]
            prose-blockquote:leading-[1.8]
            
            /* Blockquote Icon */
            prose-blockquote:before:content-[''] prose-blockquote:before:absolute 
            prose-blockquote:before:left-[-0.5rem] prose-blockquote:before:top-[1rem]
            prose-blockquote:before:w-4 prose-blockquote:before:h-4 prose-blockquote:before:bg-primary
            prose-blockquote:before:rounded-sm prose-blockquote:before:shadow-md
            
            /* Images - Responsive & Elegant */
            [&_.image-wrapper]:my-10 [&_.image-wrapper]:block [&_.image-wrapper]:text-center
            [&_.image-wrapper>img]:rounded-xl [&_.image-wrapper>img]:shadow-2xl 
            [&_.image-wrapper>img]:shadow-black/50 [&_.image-wrapper>img]:border 
            [&_.image-wrapper>img]:border-primary/10 [&_.image-wrapper>img]:mx-auto
            [&_.image-wrapper>img]:max-w-full [&_.image-wrapper>img]:h-auto
            [&_.image-wrapper>figcaption]:mt-4 [&_.image-wrapper>figcaption]:text-sm 
            [&_.image-wrapper>figcaption]:text-gray-500 [&_.image-wrapper>figcaption]:italic
            [&_.image-wrapper>figcaption]:empty:hidden
            
            /* Horizontal Rules - Section Dividers */
            prose-hr:border-primary/20 prose-hr:my-16 prose-hr:border-t-2 prose-hr:border-dashed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Footer Navigation */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-primary/10"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Ver todos os artigos</span>
          </Link>
        </motion.footer>
      </article>
    </main>
  );
}
