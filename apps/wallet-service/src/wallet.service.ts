// import { Injectable, BadRequestException,InternalServerErrorException,Logger,Inject } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Wallet } from './wallet.entity';
// import { Repository } from 'typeorm';
// import { TransactionService } from './tranaction.service';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';

// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

// @Injectable()
// export class WalletService {
//   constructor(
//     @InjectRepository(Wallet)
//     private readonly walletRepo: Repository<Wallet>,
//     private readonly transactionService: TransactionService,
//     private readonly httpService: HttpService,
//     @Inject(CACHE_MANAGER) private readonly cache: Cache,
//   ) {}

//   async getWallet(userId: number): Promise<Wallet> {
//     let wallet = await this.walletRepo.findOne({ where: { userId } });
//     if (!wallet) {
//       wallet = this.walletRepo.create({ userId, balances: {} });
//       wallet = await this.walletRepo.save(wallet);
//     }
//     return wallet;
//   }

//   async fundWallet(userId: number, currency: string, amount: number): Promise<Wallet> {
//     const wallet = await this.getWallet(userId);
//     wallet.balances[currency] = (wallet.balances[currency] || 0) + amount;
//     await this.walletRepo.save(wallet);
//     await this.transactionService.recordTransaction({
//       userId,
//       type: 'fund',
//       currency,
//       amount,
//       status: 'success',
//     });
//     return wallet;
//   }

//   async convertCurrency(
//     userId: number,
//     fromCurrency: string,
//     toCurrency: string,
//     amount: number,
//   ): Promise<Wallet> {
//     const wallet = await this.getWallet(userId);
//     const fromBalance = wallet.balances[fromCurrency] || 0;
//     if (fromBalance < amount) {
//       throw new BadRequestException('Insufficient funds');
//     }

    
//     const apiUrl = `https://v6.exchangerate-api.com/v6/${process.env.FX_API_KEY}/latest/${fromCurrency}`;

   
//     const response = await firstValueFrom(this.httpService.get<any>(apiUrl));
//     const conversionRates = response.data?.conversion_rates;
    
//     const rate = conversionRates?.[toCurrency];

//     if (!rate) {
//       throw new BadRequestException(
//         `Conversion rate from ${fromCurrency} to ${toCurrency} not available`,
//       );
//     }

//     const convertedAmount = amount * rate;
//     wallet.balances[fromCurrency] = fromBalance - amount;
//     wallet.balances[toCurrency] = (wallet.balances[toCurrency] || 0) + convertedAmount;

//     await this.walletRepo.save(wallet);
//     await this.transactionService.recordTransaction({
//       userId,
//       type: 'convert',
//       currency: fromCurrency,
//       amount,
//       rate,
//       status: 'success',
//     });
//     return wallet;
//   }

//   async tradeCurrency(
//     userId: number,
//     fromCurrency: string,
//     toCurrency: string,
//     amount: number,
//   ): Promise<Wallet> {
//     return this.convertCurrency(userId, fromCurrency, toCurrency, amount);
//   }
// }




// import {
//   Injectable,
//   BadRequestException,
//   InternalServerErrorException,
//   Logger,
//   Inject,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Wallet } from './wallet.entity';
// import { Repository } from 'typeorm';
// import { TransactionService } from './tranaction.service';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Cache } from 'cache-manager';

// @Injectable()
// export class WalletService {
//   private readonly logger = new Logger(WalletService.name);

//   constructor(
//     @InjectRepository(Wallet)
//     private readonly walletRepo: Repository<Wallet>,
//     private readonly transactionService: TransactionService,
//     private readonly httpService: HttpService,
//     @Inject(CACHE_MANAGER) private readonly cache: Cache,
//   ) {}

//   async getWallet(userId: number): Promise<Wallet> {
//     let wallet = await this.walletRepo.findOne({ where: { userId } });
//     if (!wallet) {
//       wallet = this.walletRepo.create({ userId, balances: {} });
//       wallet = await this.walletRepo.save(wallet);
//     }
//     return wallet;
//   }

//   async fundWallet(userId: number, currency: string, amount: number): Promise<Wallet> {
//     const wallet = await this.getWallet(userId);
//     wallet.balances[currency] = (wallet.balances[currency] || 0) + amount;
//     await this.walletRepo.save(wallet);

//     await this.transactionService.recordTransaction({
//       userId,
//       type: 'fund',
//       currency,
//       amount,
//       status: 'success',
//     });

//     return wallet;
//   }

//   async convertCurrency(
//     userId: number,
//     fromCurrency: string,
//     toCurrency: string,
//     amount: number,
//   ): Promise<Wallet> {
//     const wallet = await this.getWallet(userId);
//     const fromBalance = wallet.balances[fromCurrency] || 0;

//     if (fromBalance < amount) {
//       throw new BadRequestException('Insufficient funds');
//     }

//     const rate = await this.getFxRate(fromCurrency, toCurrency);
//     const convertedAmount = amount * rate;

//     wallet.balances[fromCurrency] = fromBalance - amount;
//     wallet.balances[toCurrency] = (wallet.balances[toCurrency] || 0) + convertedAmount;

//     await this.walletRepo.save(wallet);
//     await this.transactionService.recordTransaction({
//       userId,
//       type: 'convert',
//       currency: fromCurrency,
//       amount,
//       rate,
//       status: 'success',
//     });

//     return wallet;
//   }

//   async tradeCurrency(
//     userId: number,
//     fromCurrency: string,
//     toCurrency: string,
//     amount: number,
//   ): Promise<Wallet> {
//     const wallet = await this.getWallet(userId);
//     const fromBalance = wallet.balances[fromCurrency] || 0;

//     if (fromBalance < amount) {
//       throw new BadRequestException('Insufficient funds');
//     }

//     const rate = await this.getFxRate(fromCurrency, toCurrency);
//     const tradedAmount = amount * rate;

//     wallet.balances[fromCurrency] = fromBalance - amount;
//     wallet.balances[toCurrency] = (wallet.balances[toCurrency] || 0) + tradedAmount;

//     await this.walletRepo.save(wallet);
//     await this.transactionService.recordTransaction({
//       userId,
//       type: 'trade',
//       currency: fromCurrency,
//       amount,
//       rate,
//       status: 'success',
//     });

//     return wallet;
//   }

//   private async getFxRate(from: string, to: string): Promise<number> {
//     const cacheKey = `fx-rate:${from}:${to}`;

//     const cachedRate = await this.cache.get<number>(cacheKey);
//     if (cachedRate) {
//       this.logger.debug(`FX rate cache hit: ${from} → ${to} = ${cachedRate}`);
//       return cachedRate;
//     }

//     const apiUrl = `https://v6.exchangerate-api.com/v6/${process.env.FX_API_KEY}/latest/${from}`;

//     try {
//       const response = await firstValueFrom(this.httpService.get(apiUrl, { timeout: 5000 }));
//       const conversionRates = response.data?.conversion_rates;
//       const rate = conversionRates?.[to];

//       if (!rate) {
//         throw new Error(`Missing rate for ${to}`);
//       }

//       this.logger.debug(`Fetched fresh FX rate ${from} → ${to}: ${rate}`);

//       await this.cache.set(cacheKey, rate, 300); 
//       return rate;
//     } catch (error) {
//       this.logger.error(` FX rate fetch failed: ${error.message}`);

//       if (cachedRate) {
//         this.logger.warn(` Using stale cached rate for ${from} → ${to}`);
//         return cachedRate;
//       }

//       throw new InternalServerErrorException('Unable to fetch FX rate at this time');
//     }
//   }
// }





import {
  Injectable,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Repository } from 'typeorm';
import { TransactionService } from './tranaction.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cache, } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import axiosRetry from 'axios-retry';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);

  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepo: Repository<Wallet>,

    private readonly transactionService: TransactionService,
    private readonly httpService: HttpService,

    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {
    axiosRetry(this.httpService.axiosRef, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        this.logger.warn(`Retrying FX API... [${error.message}]`);
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
      },
    });
  }

  async getWallet(userId: number): Promise<Wallet> {
    let wallet = await this.walletRepo.findOne({ where: { userId } });
    if (!wallet) {
      wallet = this.walletRepo.create({ userId, balances: {} });
      wallet = await this.walletRepo.save(wallet);
    }
    return wallet;
  }

  async fundWallet(userId: number, currency: string, amount: number): Promise<Wallet> {
    const wallet = await this.getWallet(userId);
    wallet.balances[currency] = (wallet.balances[currency] || 0) + amount;
    await this.walletRepo.save(wallet);
    await this.transactionService.recordTransaction({
      userId,
      type: 'fund',
      currency,
      amount,
      status: 'success',
    });
    return wallet;
  }

  async convertCurrency(
    userId: number,
    from: string,
    to: string,
    amount: number,
  ): Promise<Wallet> {
    const wallet = await this.getWallet(userId);
    const fromBalance = wallet.balances[from] || 0;
    if (fromBalance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    const cacheKey = `fx_rate:${from}->${to}`;
    let rate: number | undefined;

    try {
      const url = `https://v6.exchangerate-api.com/v6/${process.env.FX_API_KEY}/latest/${from}`;
      const response = await firstValueFrom(this.httpService.get(url));
      rate = response.data?.conversion_rates?.[to];

      if (!rate) throw new Error('Rate unavailable');

      await this.cache.set(cacheKey, rate, 60 * 10); 
    } catch (error) {
      this.logger.error(`FX rate fetch failed: ${error.message}`);

      const cached = await this.cache.get<number>(cacheKey);
      rate = cached === null ? undefined : cached;
     

      if (!rate) {
        throw new BadRequestException('Could not fetch FX rate and no fallback exists');
      }

      this.logger.warn(`Using cached FX rate for ${from}->${to}: ${rate}`);
    }

    const convertedAmount = amount * rate;
    wallet.balances[from] = fromBalance - amount;
    wallet.balances[to] = (wallet.balances[to] || 0) + convertedAmount;
    await this.walletRepo.save(wallet);

    await this.transactionService.recordTransaction({
      userId,
      type: 'convert',
      currency: from,
      amount,
      status: 'success',
      rate,
    });
    return wallet;
  }

  async tradeCurrency(
    userId: number,
    from: string,
    to: string,
    amount: number,
  ): Promise<Wallet> {
    return this.convertCurrency(userId, from, to, amount);
  }
}
