import { NextResponse } from 'next/server'

const OWNER = 'GuilhermeRossiKirsten'
const REPO = 'Livros'
const PATH = 'cpp_masterclass'
const BRANCH = 'master'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export async function GET() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(GITHUB_TOKEN && {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      }),
    },
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Erro ao buscar PDFs no GitHub' },
      { status: response.status }
    )
  }

  const data = await response.json()

  const pdfs = data
    .filter((item: any) => item.type === 'file' && item.name.endsWith('.pdf'))
    .map((item: any) => ({
      name: item.name,
      url: item.download_url, // URL RAW → exibe inline
    }))

  return NextResponse.json(pdfs)
}
