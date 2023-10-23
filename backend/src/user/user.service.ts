import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from './dto/review.dto'
import { OrderDto } from './dto/order.dto'

@Injectable()
export class UserService {
   constructor(private readonly prisma: PrismaService) { }

   async getOrdersDate(id: string) {
      const barber = await this.prisma.barber.findUnique({
         where: { id: id },
         include: { orders: true }
      })

      if (!barber) throw new NotFoundException("Barber not found")

      return barber.orders
   }

   async getBarbers() {
      const barbers = await this.prisma.barber.findMany({
         include: { reviews: true }
      })

      return barbers
   }

   async addReview(dto: ReviewDto, authorAvatar: string) {
      const barber = await this.prisma.barber.findUnique({
         where: { id: dto.barberId },
         include: { reviews: true }
      })

      if (!barber) throw new NotFoundException("Barber not found")

      const totalRating = (barber.rating + dto.rating) / 2

      await this.prisma.$transaction([
         this.prisma.review.create({
            data: {
               author: dto.author,
               authorAvatar: authorAvatar,
               description: dto.description,
               rating: dto.rating,
               barber: { connect: { id: dto.barberId } },
            },
         }),
         this.prisma.barber.update({
            where: { id: dto.barberId },
            data: { rating: totalRating },
         }),
      ])
   }

   async createOrder(dto: OrderDto) {
      await this.prisma.order.create({
         data: {
            person: dto.person,
            date: dto.date,
            haircutType: dto.haircutType,
            barber: { connect: { id: dto.barberId } }
         }
      })
   }
}
