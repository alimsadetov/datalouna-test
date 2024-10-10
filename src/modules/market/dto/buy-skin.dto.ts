import { ApiProperty } from '@nestjs/swagger';

export class BuySkinDto {
  @ApiProperty()
  skinName: string;
}
