import { FC } from "react";
import styles from './Video.module.scss'

interface IProps {
   translateY: number
}

export const Video: FC<IProps> = ({ translateY }) => {
   return (
      <div
         
         className={styles.wr_video}
      >
         <video
         style={{ transform: `translateY(${-translateY}px)` }}
            loop
            muted
            autoPlay
            preload='auto'
            src="/videos/video.webm"
            controls={false}
         />
      </div>
   )
}