import { ApiProperty } from '@nestjs/swagger';

export class GetAllSkinItemsResponseDto {
  @ApiProperty()
  market_hash_name: string;
  @ApiProperty()
  currency: string;
  @ApiProperty()
  item_page: string;
  @ApiProperty()
  market_page: string;
  @ApiProperty()
  min_price: number;
  @ApiProperty()
  min_price_tradable: number;
}
