import { Module } from '@nestjs/common';
import { MarketController } from './controllers/market.controller';
import { MarketService } from './services/market.service';
import { UsersService } from './services/users.service';
import { SkinModule } from '../skin/skin.module';

@Module({
  imports: [SkinModule],
  controllers: [MarketController],
  providers: [MarketService, UsersService],
  exports: [],
})
export class MarketModule {}
