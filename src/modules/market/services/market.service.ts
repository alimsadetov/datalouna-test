import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { ItemsService } from 'src/modules/skin/services/items.service';
import { User } from '@prisma/client';

@Injectable()
export class MarketService {
  constructor(private readonly prisma: PrismaService, private readonly itemsService: ItemsService) {}

  async buySkin(user: User, skinName: string): Promise<boolean> {
    const foundSkin = await this.itemsService.findTradableSkin(skinName);
    if (user.balance < foundSkin.price) {
      throw new UnprocessableEntityException('Недостаточно баланса.');
    }
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: user.id }, data: { balance: { decrement: foundSkin.price } } }),
      this.prisma.skin.create({ data: { name: foundSkin.market_hash_name, owners: { connect: { id: user.id } } } }),
      this.prisma.purchase.create({
        data: { user: { connect: { id: user.id } }, skin: { connect: { name: foundSkin.market_hash_name } }, price: foundSkin.price },
      }),
    ]);
    return true;
  }
}
