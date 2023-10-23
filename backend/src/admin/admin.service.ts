import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddBarberDto, DeleteBarberDto } from './dto/barber.dto';
import { ChangeRoleDto } from './dto/change-role.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) { }

  async createNewBarber(dto: AddBarberDto) {
    const barber = await this.prisma.barber.create({
      data: {
        name: dto.name,
        image: dto.image,
        description: dto.description,
        rating: 0
      }
    })

    return barber
  }

  async changeRole(dto: ChangeRoleDto) {
    await this.prisma.user.update({
      where: { id: dto.id },
      data: { role: dto.role }
    })
  }

  async deleteBarberDto(dto: DeleteBarberDto) {
    await this.prisma.barber.delete({
      where: { id: dto.id }
    })
  }
}
