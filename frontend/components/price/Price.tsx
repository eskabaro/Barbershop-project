import { FC, useEffect } from "react"
import styles from './Price.module.scss'
import { Title } from "@/ui/title"
import { Section3Type } from "@/app/[lang]/Home"
import { prices } from "@/moks"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface IProps {
   section_3: Section3Type
}

export const Price: FC<IProps> = ({ section_3 }) => {
   const { title, table_title } = section_3

   const { ref, inView } = useInView({
      threshold: .5,
   })

   const controls = useAnimation()

   useEffect(() => {
      if (inView) {
         controls.start({ opacity: 1, x: 0 })
      }
   }, [inView])

   return (
      <section className={styles.wrapper} ref={ref}>
         <Title
            underline
            title={title}
            underlineCenter
         />
         <table className={styles.wrapper__table}>
            <tbody>
               <motion.tr
                  className={styles.title}
                  initial={{ opacity: 0 }}
                  animate={controls}
                  transition={{ duration: .3 }}
               >
                  <td>{table_title.first}</td>
                  <td>{table_title.second}</td>
               </motion.tr>
               {prices.map((e, i) => {
                  const isEven = i % 2 === 0
                  const backgroundColor = isEven ? '#191d24' : '#13171D'

                  return (
                     <motion.tr
                        key={e.id}
                        initial={{ opacity: 0, x: isEven ? -300 : 300 }}
                        animate={controls}
                        transition={{ duration: .7, delay: .1 * i }}
                     >
                        <td style={{ backgroundColor }}><span>{e.title}</span></td>
                        <td style={{ backgroundColor }}><span>{e.price}</span></td>
                     </motion.tr>
                  )
               })}
            </tbody>
         </table>
      </section >
   )
}