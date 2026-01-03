import { notFound } from "next/navigation";
import { getArticleBySlug, markdownToHtml } from "@/lib/markdown";
import ArticleContent from "./article-content";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const htmlContent = markdownToHtml(article.content);
  const readingTime = Math.ceil(article.content.split(/\s+/).length / 200);

  return (
    <ArticleContent
      article={article}
      htmlContent={htmlContent}
      readingTime={readingTime}
    />
  );
}
