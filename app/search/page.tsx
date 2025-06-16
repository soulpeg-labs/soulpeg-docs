"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import searchData from "@/lib/searchData.json"

export default function SearchPage() {
  const params = useSearchParams()
  const q = params.get("q")?.toLowerCase() || ""
  
  // Ищем по заголовкам, описаниям и контенту
  const hits = searchData.filter(doc => {
    const searchableText = `${doc.title} ${doc.description} ${doc.headings.join(' ')} ${doc.content}`.toLowerCase()
    return searchableText.includes(q)
  })
  
  return (
    <main className="mx-auto max-w-4xl p-8 text-soulpeg-light">
      <h1 className="mb-8 text-3xl font-bold">
        Search: <span className="text-soulpeg-accent-blue">{q}</span>
      </h1>
      
      {!q && <p className="text-soulpeg-gray">Type a query in the navbar...</p>}
      {q && hits.length === 0 && <p className="text-soulpeg-gray">No results found.</p>}
      
      <div className="space-y-6">
        {hits.map(hit => (
          <div key={hit.slug} className="border-b border-soulpeg-border pb-6">
            <Link 
              href={`/docs/${hit.slug}`}
              className="group"
            >
              <h2 className="text-xl font-semibold text-soulpeg-accent-blue hover:underline mb-2">
                {hit.title}
              </h2>
              {hit.description && (
                <p className="text-soulpeg-gray mb-2">{hit.description}</p>
              )}
              {hit.headings.length > 0 && (
                <div className="text-sm text-soulpeg-gray">
                  <span className="font-medium">Sections: </span>
                  {hit.headings.slice(0, 3).join(' • ')}
                  {hit.headings.length > 3 && ' ...'}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
} 