import { FC } from "react";
import styles from './Header.module.scss'
import Image from "next/image";
import Link from "next/link";

export const Header: FC = () => {
   return (
      <header className={styles.header}>
         <Link href={'/'} className={styles.header__logo_box}>
            <Image src={'/logo.jpg'} width={80} height={80} alt="Logo" />
            <p>Black Jack</p>
         </Link>
      </header>
   )
} 