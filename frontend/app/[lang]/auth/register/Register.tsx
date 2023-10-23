'use client'

import { FC, useState } from "react";
import styles from './Register.module.scss'
import { Button, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import cn from 'classnames'
import { AuthService } from "@/services/auth/auth.service";

interface IFormInput {
   name: string,
   email: string,
   password: string,
   reapPass: string
}

type returnClassesType = "name" | "email" | "password" | "reapPass"

export const Register: FC = () => {
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

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      await AuthService.register(data)
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
               Register
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
                  placeholder="Name"
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
                  placeholder="Email"
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
                  placeholder="Password"
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
                  placeholder="Reapet password"
               />
               <small>{errors.reapPass?.message}</small>
            </div>
            <label><input type="checkbox" onChange={() => setIsShowPass(!isShowPass)} /> Show password</label>
            <Button variant="outlined" type="submit">Create account</Button>
            <Link href={''}>Need account? | Register</Link>
         </form>
      </section>
   )
}