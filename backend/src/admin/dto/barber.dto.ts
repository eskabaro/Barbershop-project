import { IsString } from "class-validator"

export class AddBarberDto {
   @IsString()
   name: string

   @IsString()
   image: string

   @IsString()
   description: string
}

export class DeleteBarberDto {
   @IsString()
   id: string
}