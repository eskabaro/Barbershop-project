import { FC } from "react";
import styles from './Header.module.scss'
import Image from "next/image";
import Link from "next/link";
import { Links } from "@/ui/header-links";
import { IPropsFirstScreen } from "../first-screen";
import { Aboutas } from "@/ui/header-aboutas";
import { Drawer } from "../drawer";

interface IProps extends Omit<IPropsFirstScreen, "content"> { }

export const Header: FC<IProps> = ({ header }) => {

   return (
      <header className={styles.header}>
         <div className={styles.header__info}>
            <Aboutas time_work={header.time_work} lcation={header.lcation} />
         </div>

         <Link href={'/'} className={styles.header__logo}>
            <Image
               alt="Logo"
               width={100}
               height={100}
               priority
               src={'/logo.jpg'}
            />
            <p>Black Jack</p>
         </Link>

         <Drawer content={header} />

         <div className={styles.header__links}>
            <Links links={header.links} />
         </div>
      </header>
   )
}