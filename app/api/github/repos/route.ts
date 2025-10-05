import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://api.github.com/users/guilhermerossikirsten/repos?sort=updated&per_page=100",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();

    const projects = repos.map((repo: any) => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || "Sem descrição disponível",
      tags: repo.topics || [],
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      homepage: repo.homepage,
      updated_at: repo.updated_at,
    }));

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
