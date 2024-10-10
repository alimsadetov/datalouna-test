import { Module } from '@nestjs/common';
import { ApiService } from './services/api.service';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';

@Module({
  imports: [],
  controllers: [ItemsController],
  providers: [ApiService, ItemsService],
  exports: [ItemsService],
})
export class SkinModule {}
