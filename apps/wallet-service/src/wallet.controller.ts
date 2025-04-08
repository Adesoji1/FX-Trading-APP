import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WalletService } from './wallet.service';
import { TransactionService } from './tranaction.service';

@Controller()
export class WalletController {
  private readonly logger = new Logger(WalletController.name);

  constructor(
    private readonly walletService: WalletService, 
    private readonly transactionService: TransactionService,

  ) {}

  @Get() 
  getHealth(): string {
    return 'Wallet Service Running';
  }

  @MessagePattern({ cmd: 'get_wallet' })
  async getWallet(@Payload() payload: any) {
    this.logger.log(`get_wallet ⟶ ${JSON.stringify(payload)}`);
    return this.walletService.getWallet(payload.userId);
  }

  @MessagePattern({ cmd: 'fund_wallet' })
  async fundWallet(@Payload() dto: any) {
    this.logger.log(`fund_wallet ⟶ ${JSON.stringify(dto)}`);
    return this.walletService.fundWallet(dto.userId, dto.currency, dto.amount);
  }

  @MessagePattern({ cmd: 'convert' })
  async convert(@Payload() dto: any) {
    this.logger.log(`convert ⟶ ${JSON.stringify(dto)}`);
    return this.walletService.convertCurrency(
      dto.userId,
      dto.fromCurrency,
      dto.toCurrency,
      dto.amount,
    );
  }


  @MessagePattern({ cmd: 'get_transactions' })
  async getTransactions(@Payload() payload: { userId: number; type?: string; status?: string; from?: string; to?: string }) {
    this.logger.log(`get_transactions ⟶ ${JSON.stringify(payload)}`);
    return this.transactionService.getUserTransactions(payload.userId, {
      type: payload.type as any,
      status: payload.status as any,
      from: payload.from,
      to: payload.to,
    });
  }


  @MessagePattern({ cmd: 'trade' })
  async trade(@Payload() dto: any) {
    this.logger.log(`trade ⟶ ${JSON.stringify(dto)}`);
    return this.walletService.tradeCurrency(
      dto.userId,
      dto.fromCurrency,
      dto.toCurrency,
      dto.amount,
    );
  }
}



