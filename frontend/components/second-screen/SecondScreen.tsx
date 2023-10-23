import { FC } from "react"
import { Container } from "../container"
import { AboutUs } from "../about-us"
import { IHomeProps } from "@/app/[lang]/Home"
import { Section } from "../section-2"
import { Price } from "../price"
import { Photos } from "../photos"
interface IProps extends Omit<IHomeProps, 'first_screen'> { }

export const SecondScreen: FC<IProps> = ({ second_screen }) => {
   return (
      <Container bg rel zIdx>
         <AboutUs section_1={second_screen.section_1} />
         <Section titles={second_screen.section_2.titles} />
         <Price section_3={second_screen.section_3} />
         <Photos {...second_screen.section_4} />
      </Container>
   )
}