import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from '../services/items.service';
import { GetAllSkinItemsResponseDto } from '../dto/get-all-items-reponse.dto';
import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  @CacheKey('items')
  @CacheTTL(30000)
  @ApiOperation({ summary: 'Получить скины' })
  @ApiResponse({ status: 200, type: GetAllSkinItemsResponseDto, isArray: true })
  async find() {
    const value = await this.cacheManager.get(`items`);
    if (value) {
      return value;
    }
    return this.itemsService.getAllSkinItems();
  }
}
