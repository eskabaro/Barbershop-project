'use client'

import { FC } from "react"

import Link from "next/link"
import classnames from "classnames"

import { usePathname } from "next/navigation"
import { i18n } from "@/i18n.config"

import styles from './LangSwitcher.module.scss'

export const LanguageSwitcher: FC = () => {
   const pathName = usePathname()

   const redirectedPathName = (locale: string) => {
      if (!pathName) return '/'
      const segments = pathName.split('/')
      segments[1] = locale
      return segments.join('/')
   }

   return (
      <ul className={styles.wrapper}>
         {i18n.locales.map(locale => <li key={locale}>
            <Link
               href={redirectedPathName(locale)}
               className={classnames({
                  [styles.active]: pathName === '/' + locale,
               })}
            >
               {locale}
            </Link>
         </li>
         )}
      </ul>
   )
}