import { Body, Controller, Delete, HttpCode, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AddBarberDto, DeleteBarberDto } from "./dto/barber.dto";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { User } from "@prisma/client";
import { ChangeRoleDto } from "./dto/change-role.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) { }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Patch("change-role")
  async changeRole(@CurrentUser() user: User, @Body() dto: ChangeRoleDto) {
    if (user.role.includes('ADMIN')) {
      return this.adminService.changeRole(dto)
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post("barber")
  async createNewBarber(@CurrentUser() user: User, @Body() dto: AddBarberDto) {
    if (user.role.includes('ADMIN')) {
      return this.adminService.createNewBarber(dto)
    }
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete("barber")
  async deleteBarber(@CurrentUser() user: User, @Body() dto: DeleteBarberDto) {
    if (user.role.includes('ADMIN')) {
      return this.adminService.deleteBarberDto(dto)
    }
  }
} 
