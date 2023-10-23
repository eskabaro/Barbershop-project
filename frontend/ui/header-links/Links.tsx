import { Dispatch, FC, SetStateAction, useState } from "react"
import styles from './Links.module.scss'
import cn from 'classnames'

interface IProps {
   links: string[]
   setIsShow?: Dispatch<SetStateAction<boolean>>
}

export const Links: FC<IProps> = ({ links, setIsShow }) => {
   const [currentIdx, setCurrentIdx] = useState<number | null>(null)

   const changeLink = (idx: number) => {
      setTimeout(() => setIsShow?.(false), 350)
      setCurrentIdx(idx)
   }

   return (
      <nav className={styles.links}>
         <ul>{links.map((e, i) => <button
            key={e}
            className={cn({
               [styles.active]: currentIdx === i
            })}
            onClick={() => changeLink(i)}
         >{e}</button>)}</ul>
      </nav>
   )
}