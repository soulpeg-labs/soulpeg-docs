"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarNavItems = [
  {
    title: "Introducing",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16 12 12 8 8 12" />
        <line x1="12" y1="16" x2="12" y2="8" />
      </svg>
    ),
    items: [
      { title: "What is SoulPeg?", href: "/docs/introducing/what-is-soulpeg" },
      { title: "Key Features", href: "/docs/introducing/key-features" },
    ],
  },
  {
    title: "Protocol",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
        <path d="M20.5 7.5L16 12l4.5 4.5M3.5 7.5L8 12l-4.5 4.5" />
      </svg>
    ),
    items: [
      { title: "Token Lifecycle", href: "/docs/protocol/token-lifecycle" },
      { title: "Locking Mechanism", href: "/docs/protocol/locking-mechanism" },
      { title: "Flash-Loan Resistance", href: "/docs/protocol/flash-loan-resistance" },
      { title: "Transfer Restrictions", href: "/docs/protocol/transfer-restrictions" },
      { title: "Contract Design", href: "/docs/protocol/contract-design" },
      { title: "Security & Limits", href: "/docs/protocol/security-limits" },
      { title: "Analytics & Monitoring", href: "/docs/protocol/analytics-monitoring" },
    ],
  },
  {
    title: "FAQ",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    items: [
      { title: "What is sUSDC", href: "/docs/faq/what-is-susdc" },
      { title: "Why Soulbound?", href: "/docs/faq/why-soulbound" },
      { title: "How Locking Works", href: "/docs/faq/how-locks-work" },
      { title: "Can I Transfer sUSDC?", href: "/docs/faq/can-i-transfer" },

      { title: "How Are Rewards Distributed?", href: "/docs/faq/how-rewards-work" },
      { title: "How Do I Unlock My Tokens?", href: "/docs/faq/how-to-unlock" },
      { title: "What If I Lose My Wallet?", href: "/docs/faq/what-if-i-lose-wallet" },
      { title: "Security Safeguards", href: "/docs/faq/security-safeguards" },
      { title: "Audit Status", href: "/docs/how-to-use/audit-status" }
    ],
  },
  {
    title: "Whitepaper",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    items: [
      { title: "Abstract", href: "/docs/whitepaper/abstract" },
      { title: "Protocol Architecture", href: "/docs/whitepaper/protocol-architecture" },
      { title: "Token Lifecycle", href: "/docs/whitepaper/token-lifecycle-whitepaper" },
      { title: "Locking & Soulbound Logic", href: "/docs/whitepaper/locking-and-soulbound" },
      { title: "Reward Distribution", href: "/docs/whitepaper/reward-distribution" },

      { title: "Burn & Supply Control", href: "/docs/whitepaper/burn-and-supply-control" },
      { title: "Security Model", href: "/docs/whitepaper/security-model" },
      { title: "Governance & Multisig", href: "/docs/whitepaper/governance-multisig" },
      { title: "Tokenomics", href: "/docs/whitepaper/tokenomics" },
      { title: "Roadmap", href: "/docs/whitepaper/roadmap" },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:block w-72 bg-soulpeg-dark border-r border-soulpeg-border p-6 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
      <nav className="space-y-6">
        {sidebarNavItems.map((category) => (
          <div key={category.title}>
            <Link
              href={category.items[0].href}
              className="flex w-full items-center gap-2 mb-3 px-2 text-xs font-semibold tracking-wider uppercase text-soulpeg-gray hover:text-white transition-colors"
            >
              <span className="text-soulpeg-accent-purple">{category.icon}</span>
              {category.title}
            </Link>
            <ul className="space-y-1">
              {category.items.map((item) => {
                const isActive = pathname === item.href

                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-2 py-1.5 text-sm rounded-md transition-colors
                        ${isActive
                          ? "bg-soulpeg-accent-blue/10 text-soulpeg-accent-blue font-medium"
                          : "text-soulpeg-light hover:bg-soulpeg-darker hover:text-white"
                        }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
