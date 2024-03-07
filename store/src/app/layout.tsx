import { getURL } from '@/utils/utils'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { Footer } from './footer'
import './globals.css'
import { Header, TopBanner } from './header'
import { LogRocket } from './logrocket'
import messageUs from './messenger.webp'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth bg-gray-50/60 text-gray-900">
      <body className={inter.className}>
        {process.env.NODE_ENV === 'production' && <LogRocket />}
        <a
          target="_blank"
          aria-label="Contactez-nous sur Messenger"
          href="//m.me/226796627192300"
          className="fixed bottom-4 right-4 z-20 animate-bounce lg:bottom-10 lg:right-10"
        >
          <Image src={messageUs} width={52} height={52} alt="" unoptimized />
        </a>
        <TopBanner />
        <Header />
        <div className="mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s | Gizmo',
    default: 'Gizmo Tech DZ', // a default is required when creating a template
  },
  description:
    'Découvrez des composants PC de premier ordre chez Gizmo Tech DZ - votre guichet unique pour tout ce dont vous avez besoin pour construire ou mettre à niveau votre PC avec facilité et confiance.',
  openGraph: {
    images: [
      {
        url: getURL('/opengraph-image.png'),
      },
    ],
  },
  icons: {
    icon: {
      url: '/icon.png',
      sizes: '64x64',
    },
  },
}
export const viewport: Viewport = {
  themeColor: '#111827',
  colorScheme: 'light',
}
