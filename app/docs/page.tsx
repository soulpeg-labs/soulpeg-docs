import { redirect } from 'next/navigation'

// Перенаправляем на What is SoulPeg когда заходят на /docs
export default function DocsPage() {
  redirect('/docs/introducing/what-is-soulpeg')
} 