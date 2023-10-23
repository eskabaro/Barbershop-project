import { IsString } from "class-validator"

export class OrderDto {
   @IsString()
   barberId: string

   @IsString()
   person: string

   @IsString()
   date: string

   @IsString()
   haircutType: string
}