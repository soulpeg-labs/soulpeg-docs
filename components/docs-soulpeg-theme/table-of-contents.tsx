"use client"

import { useEffect, useState, useRef } from "react"

interface Heading {
  text: string
  level: number
  id: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const tocRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -70% 0%" }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  useEffect(() => {
    if (!activeId || !tocRef.current) return
    const link = tocRef.current.querySelector<HTMLAnchorElement>(
      `a[href="#${activeId}"]`
    )
    if (!link) return

    const container = tocRef.current
    const linkTop = link.offsetTop
    const linkBottom = linkTop + link.offsetHeight
    const viewTop = container.scrollTop
    const viewBottom = viewTop + container.clientHeight

    // если ссылка вышла за пределы видимой области — центрируем
    if (linkTop < viewTop || linkBottom > viewBottom) {
      container.scrollTo({
        top: linkTop - container.clientHeight / 2,
        behavior: "smooth",
      })
    }
  }, [activeId])

  return (
    <aside
      ref={tocRef}
      className="hidden lg:block w-64 p-6 border-l border-soulpeg-border sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto"
    >
      <h3 className="text-sm font-semibold text-white mb-3">On this page</h3>
      <div className="space-y-1">
        {headings.map((heading, index) => (
          <a
            key={index}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById(heading.id)
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
            className={`block text-sm transition-colors hover:text-soulpeg-accent-blue ${
              heading.level === 2
                ? "text-soulpeg-light py-1"
                : "text-soulpeg-gray py-0.5 pl-4"
            } ${activeId === heading.id ? "text-soulpeg-accent-blue" : ""}`}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </aside>
  )
}