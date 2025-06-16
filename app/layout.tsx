import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoulPeg Docs',
  description: 'Official docs for SoulPeg protocol',
  icons: '/logo-soulpeg.png',   // строка вместо объекта
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-soulpeg-dark">{children}</body>
    </html>
  );
}
