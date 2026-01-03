import { NextResponse } from "next/server";
import { getAllArticles } from "@/lib/markdown";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase();
    const tag = searchParams.get("tag")?.toLowerCase();

    let articles = getAllArticles();

    // Filtrar por busca no título
    if (search) {
      articles = articles.filter((article) =>
        article.title.toLowerCase().includes(search),
      );
    }

    // Filtrar por tag
    if (tag) {
      articles = articles.filter((article) =>
        article.tags?.some((t) => t.toLowerCase() === tag),
      );
    }

    return NextResponse.json({
      success: true,
      data: articles,
      count: articles.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar artigos",
      },
      { status: 500 },
    );
  }
}
