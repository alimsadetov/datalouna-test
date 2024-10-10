import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateUser(ip: string): Promise<User> {
    const foundUser = await this.prisma.user.findUnique({ where: { ip } });
    if (foundUser) {
      return foundUser;
    }
    return await this.prisma.user.create({ data: { ip } });
  }
}
