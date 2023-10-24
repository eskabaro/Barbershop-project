'use client'

import { FC, useState } from "react";
import styles from './Register.module.scss'
import { Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import cn from 'classnames'
import { AuthService } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { IRegisterBody } from "@/services/auth/types";
import { LoadingButton } from "@mui/lab";

interface IFormInput {
   name: string,
   email: string,
   password: string,
   reapPass: string
}

interface IProps {
   title: string,
   placeholder_email: string,
   placeholder_name: string,
   placeholder_password: string,
   placeholder_reapPass: string,
   show_pass_btn: string,
   submit_btn: string
}

type returnClassesType = "name" | "email" | "password" | "reapPass"

export const Register: FC<IProps> = ({
   title,
   placeholder_email,
   placeholder_name,
   placeholder_password,
   placeholder_reapPass,
   show_pass_btn,
   submit_btn
}) => {
   const {
      register,
      formState: { errors },
      getValues,
      handleSubmit
   } = useForm<IFormInput>({
      mode: 'onBlur'
   })

   const [isShowPass, setIsShowPass] = useState<boolean>(false)
   const typePassword = isShowPass ? 'text' : 'password'

   const { mutateAsync, isError, isPending } = useMutation({
      mutationFn: (data: IRegisterBody) => {
         return AuthService.login(data)
      }
   })

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      await mutateAsync(data)
   }

   const validateReapetPassword = (value: string) => {
      const { password } = getValues()
      return password === value || 'Password mismatch'
   }

   const returnClasses = (type: returnClassesType) => {
      return cn(styles.input_box, {
         [styles.error]: errors[type]
      })
   }

   return (
      <section className={styles.wrapper}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" component="h3">
               {title}
            </Typography>
            <div className={returnClasses('name')}>
               <input
                  {...register('name', {
                     required: true,
                     pattern: {
                        value: /^[А-Яа-яA-Za-z]+$/i,
                        message: 'Login entered incorrectly'
                     }
                  })}
                  type="text"
                  placeholder={placeholder_name}
               />
               <small>{errors.name?.message}</small>
            </div>
            <div className={returnClasses('email')}>
               <input
                  {...register('email', {
                     required: true,
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: 'Eamil entered incorrectly'
                     }
                  })}
                  type="text"
                  placeholder={placeholder_email}
               />
               <small>{errors.email?.message}</small>
            </div>
            <div className={returnClasses('password')}>
               <input
                  {...register('password', {
                     required: true,
                     minLength: {
                        value: 8,
                        message: 'Password must contain at least 8 characters'
                     },
                     pattern: {
                        value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])/g,
                        message: 'The password must contain at least one special character and one number'
                     }
                  })}
                  type={typePassword}
                  placeholder={placeholder_password}
               />
               <small>{errors.password?.message}</small>
            </div>
            <div className={returnClasses('reapPass')}>
               <input
                  {...register('reapPass', {
                     required: true,
                     validate: validateReapetPassword
                  })}
                  type={typePassword}
                  placeholder={placeholder_reapPass}
               />
               <small>{errors.reapPass?.message}</small>
            </div>
            <label><input type="checkbox" onChange={() => setIsShowPass(!isShowPass)} /> {show_pass_btn}</label>
            <LoadingButton loading={isPending} disabled={isPending} variant="outlined">
               <span>
                  {submit_btn}
               </span>
            </LoadingButton>
         </form>
      </section>
   )
}