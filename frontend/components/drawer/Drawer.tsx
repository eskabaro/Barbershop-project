'use client'

import { FC, useEffect } from "react"
import { useOutside } from "@/hooks/useOutside";

import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Drawer.module.scss'
import cn from 'classnames';

import { Aboutas } from "@/ui/header-aboutas";
import { Links } from "@/ui/header-links";

interface IProps {
   content: {
      lcation: string
      time_work: string
      links: string[]
   }
}

export const Drawer: FC<IProps> = ({ content }) => {
   const { ref, isShow, setIsShow } = useOutside(false)

   useEffect(() => {
      document.body.style.overflow = isShow ? 'hidden' : 'auto'

      return () => {
         document.body.style.overflow = 'auto'
      }
   }, [isShow])

   return (
      <div ref={ref} className={styles.wr_drawer}>
         <IconButton
            aria-label="more"
            id="long-button"
            aria-haspopup="true"
            onClick={() => setIsShow(!isShow)}
         >
            <MoreVertIcon style={{ color: 'white' }} />
         </IconButton>

         <div className={cn(styles.drawer, {
            [styles.active]: isShow,
         })}>
            <header className={styles['drawer-header']}>
               <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-haspopup="true"
                  onClick={() => setIsShow(!isShow)}
               >
                  <CloseIcon sx={{ color: 'white' }} />
               </IconButton>
               <p>Black Jack</p>
            </header>
            <main className='flex-auto'>
               <Links setIsShow={setIsShow} links={content.links} />
            </main>
            <footer>
               <Aboutas lcation={content.lcation} time_work={content.time_work} />
            </footer>
         </div>
      </div>
   )
}