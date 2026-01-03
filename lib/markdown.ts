import fs from "fs";
import path from "path";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-git";

export interface ArticleMetadata {
  slug: string;
  title: string;
  description: string;
  date?: string;
  author?: string;
  tags?: string[];
}

export interface Article extends ArticleMetadata {
  content: string;
}

const articlesDirectory = path.join(process.cwd(), "content/articles");

/**
 * Extrai o título do primeiro heading (#) do conteúdo Markdown
 */
function extractTitle(content: string): string {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : "Sem título";
}

/**
 * Extrai a descrição do primeiro parágrafo após o título
 */
function extractDescription(content: string): string {
  // Remove o título
  const withoutTitle = content.replace(/^#\s+.+$/m, "").trim();

  // Pega o primeiro parágrafo (texto até dupla quebra de linha ou próximo heading)
  const descMatch = withoutTitle.match(/^([^\n#]+)/);
  const description = descMatch ? descMatch[1].trim() : "";

  // Limita a 150 caracteres
  return description.length > 150
    ? description.substring(0, 150) + "..."
    : description;
}

/**
 * Extrai metadados do frontmatter (formato simples)
 * Formato esperado:
 * ---
 * date: 2026-01-01
 * author: Nome do Autor
 * tags: [tag1, tag2, tag3]
 * ---
 */
function extractFrontmatter(content: string): {
  date?: string;
  author?: string;
  tags?: string[];
  remainingContent: string;
} {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    return { remainingContent: content };
  }

  const frontmatterText = frontmatterMatch[1];
  const remainingContent = frontmatterMatch[2];

  const dateMatch = frontmatterText.match(/date:\s*(.+)/);
  const authorMatch = frontmatterText.match(/author:\s*(.+)/);
  const tagsMatch = frontmatterText.match(/tags:\s*\[([^\]]+)\]/);

  let tags: string[] | undefined;
  if (tagsMatch) {
    tags = tagsMatch[1]
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
  }

  return {
    date: dateMatch ? dateMatch[1].trim() : undefined,
    author: authorMatch ? authorMatch[1].trim() : undefined,
    tags,
    remainingContent,
  };
}

/**
 * Lê todos os artigos do diretório
 */
export function getAllArticles(): ArticleMetadata[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { date, author, tags, remainingContent } =
        extractFrontmatter(fileContents);
      const title = extractTitle(remainingContent);
      const description = extractDescription(remainingContent);

      return {
        slug,
        title,
        description,
        date,
        author,
        tags,
      };
    });

  // Ordena por data (mais recente primeiro), se disponível
  return articles.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

/**
 * Busca um artigo específico pelo slug
 */
export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { date, author, tags, remainingContent } =
      extractFrontmatter(fileContents);
    const title = extractTitle(remainingContent);
    const description = extractDescription(remainingContent);

    return {
      slug,
      title,
      description,
      date,
      author,
      tags,
      content: remainingContent,
    };
  } catch {
    return null;
  }
}

/**
 * Converte Markdown básico para HTML
 * Suporta: headings, parágrafos, negrito, itálico, código inline, blocos de código, listas, imagens, hr
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks com syntax highlighting usando Prism.js
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || "plaintext";
    const highlighted = highlightCode(code.trim(), language);
    const escapedCode = code
      .trim()
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
    return `\n<pre class="code-block" data-language="${language}" data-code="${escapedCode}"><code class="language-${language}">${highlighted}</code></pre>\n`;
  });

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");
  html = html.replace(/^\*\*\*$/gm, "<hr />");

  // Images (antes de links para não conflitar)
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<figure class="image-wrapper"><img src="$2" alt="$1" loading="lazy" /><figcaption>$1</figcaption></figure>',
  );

  // Processar linha por linha
  const lines = html.split("\n");
  const processed: string[] = [];
  let inList = false;
  let listType = "";
  let inCodeBlock = false;
  let inTable = false;
  let tableHeaders: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) {
      if (inList) {
        processed.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inTable) {
        processed.push("</tbody></table>");
        inTable = false;
        tableHeaders = [];
      }
      processed.push("");
      continue;
    }

    // Code blocks - detectar início e fim na mesma linha ou separado
    if (trimmedLine.includes("<pre") && trimmedLine.includes("</pre>")) {
      // Code block inteiro em uma linha
      if (inList) {
        processed.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inTable) {
        processed.push("</tbody></table>");
        inTable = false;
        tableHeaders = [];
      }
      processed.push(trimmedLine);
      continue;
    }

    if (trimmedLine.startsWith("<pre")) {
      if (inList) {
        processed.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inTable) {
        processed.push("</tbody></table>");
        inTable = false;
        tableHeaders = [];
      }
      inCodeBlock = true;
      processed.push(trimmedLine);
      continue;
    }

    if (inCodeBlock && trimmedLine.includes("</pre>")) {
      inCodeBlock = false;
      processed.push(trimmedLine);
      continue;
    }

    if (inCodeBlock) {
      processed.push(line);
      continue;
    }

    // Horizontal rules
    if (trimmedLine === "<hr />") {
      if (inList) {
        processed.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inTable) {
        processed.push("</tbody></table>");
        inTable = false;
        tableHeaders = [];
      }
      processed.push(trimmedLine);
      continue;
    }

    // Images
    if (trimmedLine.startsWith("<figure")) {
      if (inList) {
        processed.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inTable) {
        processed.push("</tbody></table>");
        inTable = false;
        tableHeaders = [];
      }
      processed.push(trimmedLine);
      continue;
    }

    // Tables - Detect header row (contains |)
    if (
      trimmedLine.includes("|") &&
      !inTable &&
      !trimmedLine.match(/^\s*[-:|]+\s*$/)
    ) {
      // This might be a table header
      const cells = trimmedLine
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);

      // Check if next line is separator
      if (
        i + 1 < lines.length &&
        lines[i + 1].trim().match(/^\|?\s*[-:|]+\s*\|?\s*[-:|]+/)
      ) {
        if (inList) {
          processed.push(listType === "ul" ? "</ul>" : "</ol>");
          inList = false;
        }
        tableHeaders = cells;
        processed.push("<table>");
        processed.push("<thead><tr>");
        cells.forEach((cell) => {
          processed.push(`<th>${processInline(cell)}</th>`);
        });
        processed.push("</tr></thead>");
        processed.push("<tbody>");
        inTable = true;
        i++; // Skip separator line
        continue;
      }
    }

    // Table row
    if (inTable && trimmedLine.includes("|")) {
      const cells = trimmedLine
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);

      if (cells.length > 0) {
        processed.push("<tr>");
        cells.forEach((cell) => {
          processed.push(`<td>${processInline(cell)}</td>`);
        });
        processed.push("</tr>");
        continue;
      }
    }

    // Headings
    if (trimmedLine.match(/^#{1,6}\s+/)) {
      if (inList) {
        processed.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inTable) {
        processed.push("</tbody></table>");
        inTable = false;
        tableHeaders = [];
      }
      const level = trimmedLine.match(/^(#{1,6})\s+/)?.[1].length || 1;
      const content = trimmedLine.replace(/^#{1,6}\s+/, "");
      processed.push(`<h${level}>${processInline(content)}</h${level}>`);
      continue;
    }

    // Unordered lists
    if (trimmedLine.match(/^\s*[-*]\s+/)) {
      const content = trimmedLine.replace(/^\s*[-*]\s+/, "");
      if (!inList || listType !== "ul") {
        if (inList) processed.push(listType === "ul" ? "</ul>" : "</ol>");
        processed.push("<ul>");
        inList = true;
        listType = "ul";
      }
      processed.push(`<li>${processInline(content)}</li>`);
      continue;
    }

    // Ordered lists
    if (trimmedLine.match(/^\s*\d+\.\s+/)) {
      const content = trimmedLine.replace(/^\s*\d+\.\s+/, "");
      if (!inList || listType !== "ol") {
        if (inList) processed.push(listType === "ul" ? "</ul>" : "</ol>");
        processed.push("<ol>");
        inList = true;
        listType = "ol";
      }
      processed.push(`<li>${processInline(content)}</li>`);
      continue;
    }

    // Blockquotes
    if (trimmedLine.startsWith(">")) {
      if (inList) {
        processed.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inTable) {
        processed.push("</tbody></table>");
        inTable = false;
        tableHeaders = [];
      }
      const content = trimmedLine.replace(/^>\s*/, "");
      processed.push(`<blockquote>${processInline(content)}</blockquote>`);
      continue;
    }

    // Regular paragraph
    if (inList) {
      processed.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
    }
    if (inTable) {
      processed.push("</tbody></table>");
      inTable = false;
      tableHeaders = [];
    }
    processed.push(`<p>${processInline(trimmedLine)}</p>`);
  }

  // Close any open list or table
  if (inList) {
    processed.push(listType === "ul" ? "</ul>" : "</ol>");
  }
  if (inTable) {
    processed.push("</tbody></table>");
  }

  return processed.join("\n");
}

/**
 * Processa formatação inline (negrito, itálico, código, links)
 */
function processInline(text: string): string {
  // Inline code (antes de outros para evitar processar dentro de código)
  text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Bold and Italic (ordem importa!)
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/__(.+?)__/g, "<strong>$1</strong>");
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");
  text = text.replace(/_(.+?)_/g, "<em>$1</em>");

  // Links
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  return text;
}

/**
 * Adiciona syntax highlighting básico para blocos de código
 */
function highlightCode(code: string, language: string): string {
  try {
    // Mapeia aliases comuns para nomes do Prism
    const languageMap: Record<string, string> = {
      js: "javascript",
      ts: "typescript",
      py: "python",
      sh: "bash",
      shell: "bash",
      yml: "yaml",
      dockerfile: "docker",
    };

    const lang = languageMap[language] || language;
    const grammar = Prism.languages[lang];

    if (grammar) {
      // Usa Prism para aplicar syntax highlighting
      let highlighted = Prism.highlight(code, grammar, lang);

      // Pós-processamento específico para C++
      if (lang === "cpp" || lang === "c") {
        highlighted = enhanceCppHighlight(highlighted);
      }

      return highlighted;
    }

    // Fallback: retorna código escapado sem highlight
    return escapeHtml(code);
  } catch {
    // Em caso de erro, retorna código escapado
    return escapeHtml(code);
  }
}

/**
 * Melhora o highlight de C++ para std::, templates e outras construções
 */
function enhanceCppHighlight(html: string): string {
  // Lista de namespaces comuns do C++
  const namespaces = ["std", "boost", "Eigen", "cv", "gl", "sf"];
  const namespacesPattern = namespaces.join("|");

  // Destaca namespace:: antes de funções e tipos (std::, boost::, etc)
  html = html.replace(
    new RegExp(`\\b(${namespacesPattern})::(\\w+)`, "g"),
    '<span class="token namespace">$1</span><span class="token punctuation">::</span><span class="token std-function">$2</span>',
  );

  // Destaca operadores de stream << e >>
  html = html.replace(
    /&lt;&lt;/g,
    '<span class="token stream-operator">&lt;&lt;</span>',
  );
  html = html.replace(
    /&gt;&gt;/g,
    '<span class="token stream-operator">&gt;&gt;</span>',
  );

  // Destaca operadores de template <> quando contém tipos
  html = html.replace(/&lt;([^&<>]+?)&gt;/g, (match, content) => {
    // Verifica se contém tipos conhecidos ou identificadores
    if (
      /\b(int|float|double|char|bool|string|auto|void|size_t|uint32_t|uint64_t|int32_t|int64_t)\b/.test(
        content,
      ) ||
      /\b(vector|map|set|pair|tuple|shared_ptr|unique_ptr|weak_ptr|array|list|deque|queue|stack)\b/.test(
        content,
      )
    ) {
      return `<span class="token template-bracket">&lt;</span><span class="token template-content">${content}</span><span class="token template-bracket">&gt;</span>`;
    }
    return match;
  });

  // Destaca inclusões de biblioteca padrão
  html = html.replace(
    /#include\s+&lt;([^&]+)&gt;/g,
    '<span class="token directive">#include</span> <span class="token template-bracket">&lt;</span><span class="token std-header">$1</span><span class="token template-bracket">&gt;</span>',
  );

  // Destaca tipos comuns da STL que podem não estar coloridos
  const stlTypes = [
    "vector",
    "string",
    "map",
    "set",
    "unordered_map",
    "unordered_set",
    "array",
    "list",
    "deque",
    "queue",
    "stack",
    "priority_queue",
    "pair",
    "tuple",
    "shared_ptr",
    "unique_ptr",
    "weak_ptr",
  ];

  const stlPattern = stlTypes.join("|");
  html = html.replace(
    new RegExp(`\\b(${stlPattern})\\b(?![^<]*>)`, "g"),
    '<span class="token stl-type">$1</span>',
  );

  return html;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
