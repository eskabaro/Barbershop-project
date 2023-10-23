import { FC, useEffect, useState } from "react"
import { AboutUsType } from "@/app/[lang]/Home"
import { Title } from "@/ui/title"
import Image from "next/image"
import styles from './AboutUs.module.scss'
import { useInView } from "react-intersection-observer"
import { motion, useAnimation } from "framer-motion"

interface IProps {
   section_1: AboutUsType
}

export const AboutUs: FC<IProps> = ({ section_1 }) => {
   const { ref, inView } = useInView({
      threshold: .5,
   })

   const controls = useAnimation()

   useEffect(() => {
      if (inView) {
         controls.start({ opacity: 1, transform: 'translateX(0)' })
      }
   }, [inView])
   
   return (
      <section className={styles.wrapper} ref={ref}>
         <motion.div
            className={styles.wrapper__image_block}
            initial={{ opacity: 0, transform: 'translateX(-100px)' }}
            animate={controls}
            transition={{ duration: .7 }}
         >
            <Image src={'/images/about-us.jpg'} width={390} height={488} alt="About Us" priority />
         </motion.div>
         <motion.div
            className={styles.wrapper__description}
            initial={{ opacity: 0, transform: 'translateX(100px)' }}
            animate={controls}
            transition={{ duration: .7, delay: .2 }}
         >
            <Title title={section_1.title} underline />
            <p>{section_1.description}</p>
         </motion.div>
      </section>
   )
}