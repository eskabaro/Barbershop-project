'use client'

import { FC } from 'react'
import { FirstScreen } from '@/components/first-screen'
import { SecondScreen } from '@/components/second-screen'

export type AboutUsType = {
   title: string,
   description: string
}

export type Section2Type = {
   titles: string[]
}

export type Section3Type = {
   title: string,
   table_title: {
      first: string,
      second: string
   }
}

type Section4ContentType = {
   title: string,
   value: string[]
}
export type Section4Type = {
   content: Section4ContentType[]
}
export interface IHomeProps {
   first_screen: {
      header: {
         lcation: string,
         time_work: string,
         links: string[]
      }
      content: {
         title: string,
         btn_title: string
      }
   }
   second_screen: {
      section_1: AboutUsType,
      section_2: Section2Type,
      section_3: Section3Type,
      section_4: Section4Type
   }
}

export const Home: FC<IHomeProps> = ({ first_screen, second_screen }) => {
   return (
      <>
         <FirstScreen
            header={first_screen.header}
            content={first_screen.content}
         />
         <SecondScreen
            second_screen={second_screen}
         />
      </>
   )
}