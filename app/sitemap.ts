import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rossik.dev.br";

  // Páginas estáticas públicas
  const staticPages = ["", "/articles", "/status"];

  const articlesDir = path.join(process.cwd(), "content/articles");

  let articleEntries: MetadataRoute.Sitemap = [];

  if (fs.existsSync(articlesDir)) {
    const articleFiles = fs
      .readdirSync(articlesDir)
      .filter((file) => file.endsWith(".md") && file !== "_template.md");

    articleEntries = articleFiles.map((file) => {
      const slug = file.replace(".md", "");
      const filePath = path.join(articlesDir, file);
      const stats = fs.statSync(filePath);

      return {
        url: `${baseUrl}/articles/${slug}`,
        lastModified: stats.mtime,
      };
    });
  }

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...articleEntries];
}
