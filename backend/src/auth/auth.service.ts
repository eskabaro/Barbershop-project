import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { hash, verify } from 'argon2'
import { User } from '@prisma/client'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { RefreshToken } from './dto/refresh-token.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async register(dto: RegisterDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (oldUser) throw new BadRequestException("User already exists")

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        role: ["USER"],
        avatarPath: '',
        password: await hash(dto.password),
        accessToken: '',
        refreshToken: ''
      },
    })

    return {
      user: this.returnUserWihtOutPassAndTokens(user)
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    })

    return {
      user: this.returnUserWihtOutPassAndTokens(user), ...tokens
    }
  }

  async updateTokens(dto: RefreshToken) {
    const result = await this.jwtService.verifyAsync(dto.refreshToken)

    if (!result) throw new UnauthorizedException("Invalid refresh token")

    const tokens = await this.issueTokens(result.id)

    const user = await this.prisma.user.update({
      where: { id: result.id },
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    })

    return {
      user: this.returnUserWihtOutPassAndTokens(user), ...tokens
    }
  }

  private async issueTokens(uId: string) {
    const data = { id: uId }

    const accessToken = this.jwtService.sign(data, {
      expiresIn: "1h"
    })

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: "5d"
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (!user) throw new NotFoundException("User not found")

    const isValidate = await verify(user.password, dto.password)

    if (!isValidate) throw new UnauthorizedException("Invalid password")

    return user
  }

  private returnUserWihtOutPassAndTokens(user: User) {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      avatarPath: user.avatarPath,
    }
  }
}
