import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';  
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class FxService {
  private ratesCache: Record<string, number> = {};
  private lastFetched = 0;
  private cacheDuration = 10 * 60 * 1000; 

  constructor(private readonly httpService: HttpService) {}

  async getRate(from: string, to: string): Promise<number> {
    const now = Date.now();
    if (!this.ratesCache || now - this.lastFetched > this.cacheDuration) {
      await this.refreshRates();
    }
    const key = `${from}_${to}`;
    const rate = this.ratesCache[key];
    if (!rate) {
      throw new InternalServerErrorException('Rate not available');
    }
    return rate;
  }

  private async refreshRates() {
    try {
      const apiKey = process.env.FX_API_KEY;
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/NGN`;
      const response: AxiosResponse<any> = await firstValueFrom(this.httpService.get<any>(url));
      const rates = response.data.conversion_rates;
      for (const [currency, rate] of Object.entries(rates)) {
        // Ensure the rate is a number.
        this.ratesCache[`NGN_${currency}`] = Number(rate);
        this.ratesCache[`${currency}_NGN`] = 1 / Number(rate);
      }
      this.lastFetched = Date.now();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch FX rates');
    }
  }
}
