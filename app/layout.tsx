import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads - A Slack Replacement Designed for Makers',
  description:
    "We've built an all-in-one communication platform designed for makers. With Threads, avoid constant interruptions, the pain of keeping up / catching up, and encourage motion over progress as your company scales.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='favicon.png' type='image/x-icon' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
