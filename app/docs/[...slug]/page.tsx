import { Navbar } from "@/components/docs-soulpeg-theme/navbar"
import { Sidebar } from "@/components/docs-soulpeg-theme/sidebar"
import { Footer } from "@/components/docs-soulpeg-theme/footer"
import { TableOfContents } from "@/components/docs-soulpeg-theme/table-of-contents"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
// @ts-ignore несовпадение типов unified
import remarkParse from "remark-parse"
// @ts-ignore idem
import remarkSlug from "remark-slug"
import html from "remark-html"
import { notFound } from "next/navigation"

/* -------------------------------------------------------------------------- */
/*  Читаем markdown → AST → добавляем slug-якоря → HTML + TOC                 */
/* -------------------------------------------------------------------------- */
async function getDocContent(slug: string[]) {
  // 1) вариант: content/docs/foo/bar.md
  let filePath = path.join(process.cwd(), "content", "docs", ...slug) + ".md"

  // 2) если выше не найден → пробуем content/docs/foo/bar/index.md
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), "content", "docs", ...slug, "index.md")
  }

  // если до сих пор нет файла — бросаем notFound
  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data: frontmatter, content: md } = matter(fileContents)

    // remark-конвейер
    const processor = remark().use(remarkParse).use(remarkSlug as any)

    // 1. разбираем в AST, чтобы вытащить реальные id, которые добавит remark-slug
    const tree = processor.parse(md)
    // применяем плагины (mutates tree)
    // @ts-ignore
    processor.runSync(tree)

    // 2. собираем TOC (h2/h3) из AST
    const { visit } = await import("unist-util-visit")
    const headings: { text: string; level: number; id: string }[] = []

    // @ts-ignore типы unist + remark mismatch
    visit(tree, "heading", (node: any) => {
      if (node.depth === 2 || node.depth === 3) {
        const id = "user-content-" + (node.data?.id as string)
        if (!id) return
        const rawText = node.children
          .filter((c: any) => c.type === "text" || c.type === "inlineCode")
          .map((c: any) => c.value)
          .join(" ")
        headings.push({ text: rawText, level: node.depth, id })
      }
    })

    // 3. конвертируем в HTML
        const htmlContent = (
      await remark()
        .use(remarkParse)
        .use(remarkSlug as any)
        .use(html)           // ← remark-html ждёт md-строку
        .process(md)
    ).toString()

    return {
      metadata: frontmatter ?? {},
      content: htmlContent,
      headings,
      slug: slug.join("/"),
    }
  } catch (err) {
    console.error("markdown-parse error:", err)
    return null
  }
}

/* -------------------------------------------------------------------------- */
/*  Breadcrumbs helper                                                        */
/* -------------------------------------------------------------------------- */
function generateBreadcrumbs(slug: string[]) {
  const crumbs: { label: string; href: string | null }[] = [
    { label: "Docs", href: "/docs" },
  ]

  // Маппинг разделов на их первые страницы
  const sectionFirstPages: Record<string, string> = {
    "introducing": "/docs/introducing/what-is-soulpeg",
    "protocol": "/docs/protocol/token-lifecycle",
    "faq": "/docs/faq/what-is-susdc",
    "whitepaper": "/docs/whitepaper/abstract"
  }

  let currentPath = "/docs"
  slug.forEach((seg, i) => {
    currentPath += `/${seg}`
    const label = seg
      .split("-")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ")

    // Для последнего элемента href = null (текущая страница)
    // Для разделов используем маппинг на первую страницу
    let href: string | null = null
    if (i < slug.length - 1) {
      href = sectionFirstPages[seg] || currentPath
    }

    crumbs.push({ label, href })
  })

  return crumbs
}

/* -------------------------------------------------------------------------- */
/*  Page component                                                            */
/* -------------------------------------------------------------------------- */
export default async function DocPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>   // ← 1. указываем, что это promise
}) {
  const { slug = ["introduction"] } = await params   // ← 2. await-распаковка

  const doc = await getDocContent(slug)
  if (!doc) notFound()

  const breadcrumbs = generateBreadcrumbs(slug)

  return (
    <div className="flex min-h-screen flex-col bg-soulpeg-dark text-soulpeg-light">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        {/* ─────────────────────────  Main  ───────────────────────── */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumbs */}
            <div className="mb-8">
              <div className="mb-2 flex items-center text-sm text-soulpeg-gray">
                {breadcrumbs.map((crumb, i) => (
                  <div key={i} className="flex items-center">
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-soulpeg-accent-blue"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                    {i < breadcrumbs.length - 1 && (
                      <ChevronRight className="mx-1 h-4 w-4" />
                    )}
                  </div>
                ))}
              </div>

              {doc.metadata.description && (
                <p className="mb-6 text-lg text-soulpeg-gray">
                  {doc.metadata.description}
                </p>
              )}
            </div>

            {/* Rendered markdown */}
            <div
              className="prose prose-lg max-w-none prose-invert text-soulpeg-light
                         prose-headings:text-white prose-a:text-soulpeg-accent-blue
                         hover:prose-a:text-soulpeg-accent-purple prose-strong:text-white
                         prose-code:rounded prose-code:bg-soulpeg-darker prose-code:px-1
                         prose-code:py-0.5 prose-code:text-soulpeg-light
                         prose-pre:bg-soulpeg-darker prose-pre:shadow-lg"
              dangerouslySetInnerHTML={{ __html: doc.content }}
            />

            {/* Pager */}
            <div className="mt-12 border-t border-soulpeg-border pt-8">
              <div className="flex justify-between">
                {doc.metadata.prev && (
                  <Link
                    href={`/docs/${doc.metadata.prev}`}
                    className="flex items-center text-soulpeg-gray hover:text-soulpeg-accent-blue"
                  >
                    <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
                    Previous
                  </Link>
                )}

                {doc.metadata.next && (
                  <Link
                    href={`/docs/${doc.metadata.next}`}
                    className="ml-auto flex items-center text-soulpeg-gray hover:text-soulpeg-accent-blue"
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Table of contents */}
        {doc.headings.length > 0 && (
          <TableOfContents headings={doc.headings} />
        )}
      </div>

      <Footer />
    </div>
  )
}


// import { Navbar } from "@/components/docs-soulpeg-theme/navbar"
// import { Sidebar } from "@/components/docs-soulpeg-theme/sidebar"
// import { Footer } from "@/components/docs-soulpeg-theme/footer"
// import { TableOfContents } from "@/components/docs-soulpeg-theme/table-of-contents"
// import { ChevronRight } from "lucide-react"
// import Link from "next/link"
// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'
// import { remark } from 'remark'
// import html from 'remark-html'
// // @ts-ignore  remark-slug types conflict with unified versions – safe to ignore
// import remarkSlug from 'remark-slug'
// import GithubSlugger from 'github-slugger'
// import { notFound } from 'next/navigation'

// // Получаем контент из markdown файлов
// async function getDocContent(slug: string[]) {
//   const filePath = path.join(process.cwd(), 'content/docs', ...slug) + '.md'
  
//   try {
//     const fileContents = fs.readFileSync(filePath, 'utf8')
//     const { data, content } = matter(fileContents)
    
//     // Конвертируем markdown в HTML
//     const processedContent = await remark()
//       .use(remarkSlug as any)
//       .use(html)
//       .process(content)
//     let contentHtml = processedContent.toString()
    
//     // Проверяем, какие ID были добавлены remark-slug
//     const hasIds = /<h[2-3]\s+id=/.test(contentHtml)
    
//     // Если remark-slug не добавил ID, добавляем их вручную
//     if (!hasIds) {
//       const tempSlugger = new GithubSlugger()
//       contentHtml = contentHtml.replace(/<h([2-3])>([^<]+)<\/h[2-3]>/g, (match, level, text) => {
//         const cleanText = text.trim()
//         const id = tempSlugger.slug(cleanText)
//         return `<h${level} id="${id}">${cleanText}</h${level}>`
//       })
//     }
    
//     // Извлекаем заголовки для TOC
//     const slugger = new GithubSlugger()
//     const headings: Array<{ text: string; level: number; id: string }> = []
//     const headingRegex = /^(#{2,3})\s+(.+)$/gm
//     let match
//     while ((match = headingRegex.exec(content)) !== null) {
//       const level = match[1].length
//       const text = match[2]
//       const id = slugger.slug(text) // Используем github-slugger для генерации ID
//       headings.push({ text, level, id })
//     }
    
//     return {
//       metadata: data,
//       content: contentHtml,
//       headings,
//       slug: slug.join('/')
//     }
//   } catch (error) {
//     return null
//   }
// }

// // Генерируем breadcrumbs
// function generateBreadcrumbs(slug: string[]) {
//   const breadcrumbs: Array<{ label: string; href: string | null }> = [
//     { label: 'Docs', href: '/docs' }
//   ]
  
//   let currentPath = '/docs'
//   slug.forEach((segment, index) => {
//     currentPath += `/${segment}`
//     const label = segment
//       .split('-')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ')
    
//     breadcrumbs.push({
//       label,
//       href: index === slug.length - 1 ? null : currentPath
//     })
//   })
  
//   return breadcrumbs
// }

// export default async function DocPage({ 
//   params 
// }: { 
//   params: Promise<{ slug?: string[] }>
// }) {
//   const resolvedParams = await params
//   const slug = resolvedParams.slug || ['introduction']
//   const doc = await getDocContent(slug)
  
//   if (!doc) {
//     notFound()
//   }
  
//   const breadcrumbs = generateBreadcrumbs(slug)
  
//   return (
//     <div className="flex flex-col min-h-screen bg-soulpeg-dark text-soulpeg-light">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-6 md:p-8 lg:p-10">
//           <div className="max-w-4xl mx-auto">
//             {/* Breadcrumbs */}
//             <div className="mb-8">
//               <div className="flex items-center text-sm text-soulpeg-gray mb-2">
//                 {breadcrumbs.map((crumb, index) => (
//                   <div key={index} className="flex items-center">
//                     {crumb.href ? (
//                       <Link href={crumb.href} className="hover:text-soulpeg-accent-blue">
//                         {crumb.label}
//                       </Link>
//                     ) : (
//                       <span>{crumb.label}</span>
//                     )}
//                     {index < breadcrumbs.length - 1 && (
//                       <ChevronRight className="w-4 h-4 mx-1" />
//                     )}
//                   </div>
//                 ))}
//               </div>
              
//               {doc.metadata.description && (
//                 <p className="text-lg text-soulpeg-gray mb-6">
//                   {doc.metadata.description}
//                 </p>
//               )}
//             </div>

//             {/* Markdown content */}
//             <div 
//               className="prose prose-invert prose-lg max-w-none text-soulpeg-light prose-headings:text-white prose-a:text-soulpeg-accent-blue hover:prose-a:text-soulpeg-accent-purple prose-strong:text-white prose-code:text-soulpeg-light prose-code:bg-soulpeg-darker prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-soulpeg-darker prose-pre:shadow-lg"
//               dangerouslySetInnerHTML={{ __html: doc.content }}
//             />
            
//             {/* Next/Previous navigation */}
//             <div className="mt-12 pt-8 border-t border-soulpeg-border">
//               <div className="flex justify-between">
//                 {doc.metadata.prev && (
//                   <Link 
//                     href={`/docs/${doc.metadata.prev}`}
//                     className="flex items-center text-soulpeg-gray hover:text-soulpeg-accent-blue"
//                   >
//                     <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
//                     Previous
//                   </Link>
//                 )}
//                 {doc.metadata.next && (
//                   <Link 
//                     href={`/docs/${doc.metadata.next}`}
//                     className="flex items-center text-soulpeg-gray hover:text-soulpeg-accent-blue ml-auto"
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4 ml-1" />
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
        
//         {/* Table of contents */}
//         {doc.headings && doc.headings.length > 0 && (
//           <TableOfContents headings={doc.headings} />
//         )}
//       </div>
//       <Footer />
//     </div>
//   )
// } 