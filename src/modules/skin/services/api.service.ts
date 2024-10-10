import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { APP_ID, DEFAULT_CURRENCY, GET_ITEMS_REQUEST_URL } from 'src/config/global.config';
import { SkinModelFromSkinportDto } from '../dto/skin-model-from-skinport.dto';

@Injectable()
export class ApiService {
  constructor(private readonly configService: ConfigService) {}

  private async getApiData(url: string, params?: object) {
    try {
      const { data } = await axios.get(url, {
        params,
      });
      return data;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.response.data.errors);
    }
  }

  private async sendApiData(url: string, params: object) {
    try {
      const { data } = await axios.post(url, params, {});
      return data;
    } catch (ex) {
      console.log(ex?.response);
      throw new UnprocessableEntityException(ex?.response?.data?.errors);
    }
  }

  async getItems(tradable: boolean): Promise<SkinModelFromSkinportDto[]> {
    return await this.getApiData(this.configService.get(GET_ITEMS_REQUEST_URL), {
      tradable: tradable ? 1 : 0,
      app_id: this.configService.get(APP_ID),
      currency: this.configService.get(DEFAULT_CURRENCY),
    });
  }
}
