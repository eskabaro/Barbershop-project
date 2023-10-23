import styles from './Container.module.scss'
import cn from 'classnames'

export const Container = ({
   children,
   mt,
   bg,
   rel,
   zIdx
}: {
   children: React.ReactNode,
   mt?: boolean,
   bg?: boolean,
   rel?: boolean,
   zIdx?: boolean
}) => {
   return (
      <div className={cn(styles.cntainer, {
         [styles.mt]: mt,
         [styles.bg]: bg,
         [styles.rel]: rel,
         [styles.zIdx]: zIdx
      })}>
         <main>
            {children}
         </main>
      </div>
   )
} 