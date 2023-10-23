import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { ReviewDto } from './dto/review.dto';
import { OrderDto } from './dto/order.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("get-barbers")
  async getBarbers() {
    return this.userService.getBarbers()
  }

  @Get("barber/:id")
  async getBarberDates(@Param("id") id: string) {
    return this.userService.getOrdersDate(id)
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post("add-review")
  async addReview(@Body() dto: ReviewDto, @CurrentUser() user: User) {
    return this.userService.addReview(dto, user.avatarPath)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post("order")
  async createOrder(@Body() dto: OrderDto) {
    return this.userService.createOrder(dto)
  }
}
