import { Header } from '@/components/auth-header'
import { Container } from '@/components/container'
import { Locale } from '@/i18n.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
   icons: '/logo.jpg',
   title: 'Authorization | Black Jack'
}

export default async function RootLayout({
   children,

}: {
   children: React.ReactNode
   params: { lang: Locale }
}) {
   return (
      <Container>
         <Header />
         {children}
      </Container>
   )
}
