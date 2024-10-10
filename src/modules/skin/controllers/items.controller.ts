import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsService } from '../services/items.service';
import { GetAllSkinItemsResponseDto } from '../dto/get-all-items-reponse.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить скины' })
  @ApiResponse({ status: 200, type: GetAllSkinItemsResponseDto, isArray: true })
  async find(): Promise<any> {
    return this.itemsService.getAllSkinItems();
  }
}
