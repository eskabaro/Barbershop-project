import { FC } from "react"
import cn from 'classnames'
import styles from './Title.module.scss'

interface IProps {
   title: string
   underline?: boolean
   underlineCenter?: boolean
}

export const Title: FC<IProps> = ({ title, underline, underlineCenter }) => {
   return (
      <h1 className={cn(styles.title, {
         [styles.underline]: underline,
         [styles.underline_center]: underlineCenter
      })}>
         {title}
      </h1>
   )
} 