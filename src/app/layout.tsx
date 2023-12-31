import './globals.scss'
import { Inter } from 'next/font/google'

import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spider-Verse',
  description: 'Criando um carrossel parallax do Aranhaverso com React, Next.js 13 e Framer Motion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Image
            src="/icons/menu.svg"
            alt='Menu options'
            width={36}
            height={25}
            priority
          />
          <Link href="/">
            <Image
              src="/spider-logo.svg"
              alt="Spiderman logo"
              width={260}
              height={70}
              priority
            />
          </Link>
          <Image
            src="/icons/user.svg"
            alt="Login"
            width={36}
            height={36}
            priority
          />
        </header>
        {children}
      </body>
    </html>
  )
}
