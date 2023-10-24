'use client'

import { FC } from "react"
import Button from '@mui/material/Button';
import { ButtonGroup as ButtonG } from '@mui/material';
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const ButtonGroup: FC = () => {
   const pathname = usePathname()
   const { push } = useRouter()
   const params = useParams()

   const isDictionaries = params.lang === 'en'

   return (
      <ButtonG variant="text" sx={{ display: 'flex', alignItems: 'center' }} aria-label="text button group">
         {pathname === ('/en/auth/register' || '/ua/auth/register') ? (
            <Button onClick={() => push('/auth/login')}>{isDictionaries ? 'Login' : 'Логін'}</Button>
         ) : (
            <Button onClick={() => push('/auth/register')}>{isDictionaries ? 'Register' : 'Реєстрація'}</Button>
         )}
      </ButtonG>
   )
}