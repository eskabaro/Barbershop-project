import { IsInt, IsString, Max, Min } from "class-validator"

export class ReviewDto {
   @IsString()
   barberId: string

   @IsString()
   author: string

   @IsString()
   description: string

   @IsInt()
   @Min(0)
   @Max(5)
   rating: number
}