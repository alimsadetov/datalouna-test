import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAllSkinItemsResponseDto } from '../dto/get-all-items-reponse.dto';
import { ApiService } from './api.service';

@Injectable()
export class ItemsService {
  constructor(private readonly apiService: ApiService) {}

  async getAllSkinItems(): Promise<GetAllSkinItemsResponseDto[]> {
    const nonTradableItems = await this.apiService.getItems(false);
    const tradableItems = await this.apiService.getItems(true);
    let itemsMapped: {
      [name: string]: {
        market_hash_name: string;
        currency: string;
        item_page: string;
        market_page: string;
        min_price: number;
        min_price_tradable: number;
      };
    } = {};
    for (let item of nonTradableItems) {
      itemsMapped[item.market_hash_name] = {
        market_hash_name: item.market_hash_name,
        currency: item.currency,
        item_page: item.item_page,
        market_page: item.market_page,
        min_price: item.min_price,
        min_price_tradable: undefined,
      };
    }
    for (let item of tradableItems) {
      if (itemsMapped[item.market_hash_name]) {
        itemsMapped[item.market_hash_name].min_price_tradable = item.min_price;
      }
    }
    return Object.values(itemsMapped);
  }

  async findTradableSkin(skinName: string): Promise<{market_hash_name: string, price: number}>{
    const tradableItems = await this.apiService.getItems(true);
    const foundItem = tradableItems.find((item)=>{return item.market_hash_name===skinName})
    if (!foundItem){
      throw new NotFoundException('Скин не найден.')
    }
    return {
      market_hash_name: foundItem.market_hash_name,
      price: foundItem.min_price,
    }
  }
}
