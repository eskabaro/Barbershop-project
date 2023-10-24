'use client'

import { FC, useState } from "react";
import styles from './Login.module.scss'
import { AuthService } from "@/services/auth/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ILoginBody } from "@/services/auth/types";
import Link from "next/link";
import LoadingButton from '@mui/lab/LoadingButton';

interface IFormInput {
   email: string
   password: string
}

interface IProps {
   title: string,
   placeholder_email: string,
   placeholder_password: string,
   show_pass_btn: string,
   submit_btn: string,
   link: string
}

export const Login: FC<IProps> = ({
   title,
   placeholder_email,
   placeholder_password,
   show_pass_btn,
   submit_btn,
   link
}) => {
   const {
      register,
      formState: { errors },
      handleSubmit
   } = useForm<IFormInput>({
      mode: 'onBlur'
   })

   const [isShowPass, setIsShowPass] = useState<boolean>(false)
   const typePassword = isShowPass ? 'text' : 'password'

   const { mutateAsync, isError, isPending } = useMutation({
      mutationFn: (data: ILoginBody) => {
         return AuthService.login(data)
      }
   })

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      await mutateAsync(data)
   }

   return (
      <section className={styles.wrapper}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" component="h3">
               {title}
            </Typography>
            <div>
               <input
                  {...register('email', {
                     required: true,
                     pattern: {
                        value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                        message: 'Email entered incorrectly'
                     }
                  })}
                  type="text"
                  placeholder={placeholder_email}
               />
            </div>
            <div>
               <input
                  {...register('password', {
                     required: true,
                     minLength: {
                        value: 8,
                        message: 'Password must contain at least 8 characters'
                     },
                  })}
                  type={typePassword}
                  placeholder={placeholder_password}
               />
            </div>
            <label><input type="checkbox" onChange={() => setIsShowPass(!isShowPass)} /> {show_pass_btn}</label>
            <LoadingButton loading={isPending} disabled={isPending} variant="outlined">
               <span>
                  {submit_btn}
               </span>
            </LoadingButton>
            <Link href={'/auth/register'}>{link}</Link>
         </form>
      </section>
   )
}