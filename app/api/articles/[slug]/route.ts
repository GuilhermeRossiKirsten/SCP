import { NextResponse } from "next/server";
import { getArticleBySlug } from "@/lib/markdown";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
      return NextResponse.json(
        {
          success: false,
          error: "Artigo não encontrado",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao buscar artigo",
      },
      { status: 500 },
    );
  }
}
