'use client'

import {
   Dispatch,
   SetStateAction,
   createContext,
   useMemo,
   useState
} from 'react'
import { Locale } from '@/i18n.config'

type SetLangType<T> = Dispatch<SetStateAction<T>>

interface IContext {
   lang: Locale,
   setLang: SetLangType<Locale>
}

export const Context = createContext<IContext>({
   lang: 'ua',
   setLang: () => { }
})

export const ContextProvider = ({
   children
}: {
   children: React.ReactNode
}) => {
   const [lang, setLang] = useState<Locale>('ua')

   const contextValue: IContext = useMemo(
      () => ({
         lang,
         setLang,
      }), [lang]
   )

   return (
      <Context.Provider value={contextValue}>
         {children}
      </Context.Provider>
   )
}