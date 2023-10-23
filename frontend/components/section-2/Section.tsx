import { FC, useEffect } from "react"
import styles from './Section.module.scss'
import LiquorIcon from '@mui/icons-material/Liquor';
import CoffeeIcon from '@mui/icons-material/Coffee';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const icons = [<LiquorIcon />, <CoffeeIcon />, <VideogameAssetOutlinedIcon />];

interface IProps {
   titles: string[]
}

export const Section: FC<IProps> = ({ titles }) => {
   const content = titles.map((title, index) => ({
      image: icons[index],
      title: title,
   }))

   const controls = useAnimation()

   const { ref, inView } = useInView({
      threshold: .5,
   })

   useEffect(() => {
      if (inView) {
         controls.start({ opacity: 1, transform: 'translateY(0)' })
      }
   }, [inView])

   return (
      <section className={styles.wrapper} ref={ref}>
         {content.map((e, idx) => (
            <motion.div
               key={e.title}
               className={styles.wrapper__block}
               initial={{ opacity: 0, transform: 'translateY(100px)' }}
               animate={controls}
               transition={{ duration: .7, delay: .3 * idx }}
            >
               {e.image}
               <span>{e.title}</span>
            </motion.div>
         ))}
      </section>
   )
}