import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
//
import '../globals.css'
import {
  Bottombar,
  LeftSidebar,
  RightSidebar,
  Topbar,
} from '@components/shared'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads - A Slack Replacement Designed for Makers',
  description:
    "We've built an all-in-one communication platform designed for makers. With Threads, avoid constant interruptions, the pain of keeping up / catching up, and encourage motion over progress as your company scales.",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />

            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
