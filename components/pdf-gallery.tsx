'use client'

import { useEffect, useState } from 'react'

type Pdf = {
  name: string
  url: string
}

export default function PdfGallery() {
  const [pdfs, setPdfs] = useState<Pdf[]>([])
  const [activePdf, setActivePdf] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPdfs() {
      try {
        const res = await fetch('/api/github/pdfs')
        const data = await res.json()
        setPdfs(data)
      } catch (err) {
        console.error('Erro ao carregar PDFs', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPdfs()
  }, [])

  if (loading) {
    return <p>Carregando PDFs…</p>
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Lista de PDFs */}
      <aside
        style={{
          width: '320px',
          borderRight: '1px solid #ccc',
          padding: '1rem',
          overflowY: 'auto',
        }}
      >
        <h2>C++ Masterclass</h2>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pdfs.map((pdf) => (
            <li key={pdf.name} style={{ marginBottom: '0.5rem' }}>
              <button
                onClick={() => setActivePdf(pdf.url)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {pdf.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Visualizador */}
        <object
  data={activePdf}
  type="application/pdf"
  width="100%"
  height="100%"
>
  <p>Seu navegador não suporta visualização de PDF.</p>
</object>

    </div>
  )
}
