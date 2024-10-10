import { Controller, Post, Ip, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarketService } from '../services/market.service';
import { BuySkinDto } from '../dto/buy-skin.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Market')
@Controller('market')
export class MarketController {
  constructor(private readonly usersService: UsersService, private readonly marketService: MarketService) {}

  @Post()
  @ApiOperation({ summary: 'Купить скин' })
  @ApiResponse({ status: 200, type: Boolean})
  @ApiBody({type: BuySkinDto})
  async buySkin(@Ip() ip:string, @Body() dto: BuySkinDto): Promise<boolean> {
    const user = await this.usersService.getOrCreateUser(ip)
    return await this.marketService.buySkin(user, dto.skinName)
  }
}
