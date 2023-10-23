import { Locale } from '@/i18n.config'
import { Home } from './Home'
import { getDictionary } from '@/lib/dictionary'

export default async function HomePage({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const { first_screen, second_screen } = await getDictionary(lang)

  return <Home
    first_screen={first_screen}
    second_screen={second_screen}
  />
}
