import { FC, useEffect } from "react"
import styles from './Photos.module.scss'
import { images } from "@/moks"
import Image from "next/image"
import { ImageList, ImageListItem } from "@mui/material"
import { useWindowSize } from "@/hooks/useWindowSize"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Section4Type } from "@/app/[lang]/Home"
import { Title } from "@/ui/title"

interface IProps extends Section4Type { }

export const Photos: FC<IProps> = ({ content }) => {
   const { width } = useWindowSize()

   const changeCols = (): number => {
      if (width) {
         if (width <= 490) return 2
         if (width <= 900) return 4
      }
      return 6
   }

   const { ref, inView } = useInView({
      threshold: .5,
   })

   const controls = useAnimation()

   useEffect(() => {
      if (inView) {
         controls.start({ opacity: 1 })
      }
   }, [inView])

   return (
      <section className={styles.wrapper} ref={ref}>
         <ImageList sx={{ width: '100%', height: '100%' }} gap={1} cols={changeCols()} rowHeight={164}>
            {images.map((e, _, arr) => {
               const randomDelay = Math.random() * (arr.length * 0.07)

               return (
                  <motion.div
                     key={e.id}
                     initial={{ opacity: 0 }}
                     animate={controls}
                     transition={{ duration: .7, delay: randomDelay }}
                  >
                     <ImageListItem>
                        <Image src={e.src} width={200} height={200} alt="Photo" priority className={styles.image} />
                     </ImageListItem >
                  </motion.div>
               )
            })}
         </ImageList>
         <div className='flex justify-center gap-5 mt-12'>
            {content.map(e => (
               <div key={e.title} className='bg-secondary p-12 flex flex-col items-center max-w-xs w-full'>
                  <Title title={e.title} />
                  <small>
                     {e.value.map(e => <p key={e}>{e}</p>)}
                  </small>
               </div>
            ))}
         </div>
      </section>
   )
}