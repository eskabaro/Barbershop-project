import { FC } from "react";
import { motion } from "framer-motion"
import styles from './ScrollDown.module.scss'

export const ScrollDown: FC = () => {
   return (
      <motion.span
         initial={{ opacity: 0, translateY: -30 }}
         animate={{ opacity: 1, translateY: 0 }}
         transition={{ duration: 1, delay: 1 }}
         className={styles['mouse-btn']}
      >
         <span className={styles['mouse-scroll']} />
      </motion.span>
   )
}