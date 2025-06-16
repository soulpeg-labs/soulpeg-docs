"use client"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

import Link from "next/link"
import { Code2, Menu, Search, X, ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { MobileSidebar } from "./mobile-sidebar"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileDocsOpen, setIsMobileDocsOpen] = useState(false)
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
    <nav className="sticky top-0 z-50 bg-soulpeg-dark/80 backdrop-blur-md border-b border-soulpeg-border">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="https://www.soulpeg.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <Code2 className="h-7 w-7 text-soulpeg-accent-blue" />
            <span className="text-xl font-bold">SoulPeg</span>
          </Link>
          <span className="px-2 py-0.5 text-xs font-semibold bg-soulpeg-accent-blue text-white rounded-full">
            Docs
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="https://www.soulpeg.io" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-soulpeg-accent-blue hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to SoulPeg.io
          </Link>
          <div className="h-4 w-px bg-soulpeg-border" />
          <Link href="https://github.com/soulpeg" target="_blank" rel="noopener noreferrer" className="text-soulpeg-gray hover:text-white transition-colors">
            GitHub
          </Link>
          <Link href="https://t.me/soulpeg" target="_blank" rel="noopener noreferrer" className="text-soulpeg-gray hover:text-white transition-colors">
            Telegram
          </Link>
          <Link href="https://x.com/soulpeglabs" target="_blank" rel="noopener noreferrer" className="text-soulpeg-gray hover:text-white transition-colors">
            Twitter
          </Link>
          {isSearchOpen ? (
            <Input
              type="search"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }
              }}
              placeholder="Search docs..."
              className="w-64 bg-soulpeg-darker border-soulpeg-border focus:ring-soulpeg-accent-blue text-soulpeg-light placeholder-soulpeg-gray"
            />
          ) : (
            <Button
              variant="ghost"
              className="text-soulpeg-gray hover:text-white hover:bg-soulpeg-darker px-3"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileDocsOpen(!isMobileDocsOpen)}
            className="text-soulpeg-light hover:text-white"
          >
            <FileText className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-soulpeg-light hover:text-white"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-soulpeg-dark border-t border-soulpeg-border py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              href="https://www.soulpeg.io" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-soulpeg-accent-blue hover:text-white transition-colors py-2 font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to SoulPeg.io
            </Link>
            <div className="h-px bg-soulpeg-border" />
            <Link href="https://github.com/soulpeg" target="_blank" rel="noopener noreferrer" className="text-soulpeg-gray hover:text-white transition-colors py-2">
              GitHub
            </Link>
            <Link href="https://t.me/soulpeg" target="_blank" rel="noopener noreferrer" className="text-soulpeg-gray hover:text-white transition-colors py-2">
              Telegram
            </Link>
            <Link href="https://x.com/soulpeglabs" target="_blank" rel="noopener noreferrer" className="text-soulpeg-gray hover:text-white transition-colors py-2">
              Twitter
            </Link>
          </div>
        </div>
      )}
    </nav>
      <MobileSidebar isOpen={isMobileDocsOpen} onClose={() => setIsMobileDocsOpen(false)} />
    </>
  )
}
