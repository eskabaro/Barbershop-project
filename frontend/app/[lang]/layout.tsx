import './globals.scss'

import { Locale, i18n } from '@/i18n.config'

import { Kanit } from 'next/font/google'

import { RootProvider } from '@/providers/RootProvider'
import { ContextProvider } from '@/providers/ContextProvider'
import { Metadata } from 'next'

export const metadata: Metadata = {
  icons: '/logo.jpg',
  title: 'Black Jack'
}

const roboto = Kanit({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale, }))
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <body className={roboto.className}>
        <RootProvider>
          <ContextProvider>
            {children}
          </ContextProvider>
        </RootProvider>
      </body>
    </html>
  )
}
