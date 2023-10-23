'use client'

import { FC, useState } from "react";
import styles from './Login.module.scss'
import { AuthService } from "@/services/auth/auth.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { ILoginBody } from "@/services/auth/types";

interface IFormInput {
   email: string
   password: string
}

export const Login: FC = () => {
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
               Login
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
                  placeholder="Email"
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
                  placeholder="Password"
               />
            </div>
            <label><input type="checkbox" onChange={() => setIsShowPass(!isShowPass)} /> Show password</label>
            <Button variant="outlined" type="submit">Login</Button>
         </form>
      </section>
   )
}