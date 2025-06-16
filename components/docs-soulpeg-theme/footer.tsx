import Link from "next/link"
import { Github, Twitter, BookCopy } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-soulpeg-darker border-t border-soulpeg-border py-8 text-soulpeg-gray">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">SoulPeg Docs</h3>
            <p className="text-sm">The official docs for the SoulPeg protocol, SDKs, and platform services.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs/protocol/token-lifecycle" className="hover:text-soulpeg-accent-blue">
                  Protocol
                </Link>
              </li>
              <li>
                <Link href="/docs/faq/what-is-susdc" className="hover:text-soulpeg-accent-blue">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/docs/whitepaper/abstract" className="hover:text-soulpeg-accent-blue">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://github.com/soulpeg" target="_blank" rel="noopener noreferrer" className="hover:text-soulpeg-accent-blue flex items-center">
                  <Github className="w-4 h-4 mr-2" /> GitHub
                </Link>
              </li>
              <li>
                <Link href="https://x.com/soulpeglabs" target="_blank" rel="noopener noreferrer" className="hover:text-soulpeg-accent-blue flex items-center">
                  <Twitter className="w-4 h-4 mr-2" /> Twitter
                </Link>
              </li>
              <li>
                <Link href="https://t.me/soulpeg" target="_blank" rel="noopener noreferrer" className="hover:text-soulpeg-accent-blue flex items-center">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg> Telegram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-soulpeg-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} SoulPeg Labs. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="https://www.soulpeg.io/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-soulpeg-accent-blue">
              Privacy Policy
            </Link>
            <Link href="https://www.soulpeg.io/terms" target="_blank" rel="noopener noreferrer" className="hover:text-soulpeg-accent-blue">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
