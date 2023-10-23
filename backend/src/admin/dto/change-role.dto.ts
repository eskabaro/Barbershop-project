import { IsEnum, IsString } from "class-validator";
import { Role } from '@prisma/client'

export class ChangeRoleDto {
   @IsString()
   id: string

   @IsEnum(Role, { each: true })
   role: Role[]
}