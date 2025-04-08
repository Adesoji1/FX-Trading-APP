import { Controller, Post, Get, Param, Query, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('Gateway')
@Controller()
export class GatewayController {
  constructor(
    @Inject('AUTH_SERVICE')   private readonly authClient:   ClientProxy,
    @Inject('WALLET_SERVICE') private readonly walletClient: ClientProxy,
    @Inject('FX_SERVICE')     private readonly fxClient:     ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check for the API Gateway' })
  getHealth(): string {
    return 'API Gateway Running';
  }

  @Post('auth/register')
  @ApiOperation({ summary: 'Registers a user and sends OTP email' })
  @ApiBody({ schema: { example: { email: 'user@example.com', password: 'StrongPassword123' } } })
  register(@Body() dto: { email: string; password: string }) {
    return this.authClient.send({ cmd: 'register' }, dto);
  }

  @Post('auth/verify')
  @ApiOperation({ summary: 'Verifies OTP to activate user account' })
  @ApiBody({ schema: { example: { email: 'user@example.com', otp: '123456' } } })
  verify(@Body() dto: { email: string; otp: string }) {
    return this.authClient.send({ cmd: 'verify' }, dto);
  }

  @Get('wallet/:userId')
  @ApiOperation({ summary: 'Retrieves wallet balances by userId' })
  getWallet(@Param('userId') userId: string) {
    return this.walletClient.send({ cmd: 'get_wallet' }, { userId: +userId });
  }

  @Post('wallet/fund')
  @ApiOperation({ summary: 'Funds a wallet in specified currency' })
  @ApiBody({ schema: { example: { userId: 1, currency: 'NGN', amount: 10000 } } })
  fundWallet(@Body() dto: { userId: number; currency: string; amount: number }) {
    return this.walletClient.send({ cmd: 'fund_wallet' }, dto);
  }

  @Post('wallet/convert')
  @ApiOperation({ summary: 'Converts currency using real-time FX rates' })
  @ApiBody({ schema: { example: { userId: 1, fromCurrency: 'NGN', toCurrency: 'USD', amount: 5000 } } })
  convert(@Body() dto: { userId: number; fromCurrency: string; toCurrency: string; amount: number }) {
    return this.walletClient.send({ cmd: 'convert' }, dto);
  }

  @Post('wallet/trade')
  @ApiOperation({ summary: 'Trades NGN with another currency' })
  @ApiBody({ schema: { example: { userId: 1, fromCurrency: 'NGN', toCurrency: 'EUR', amount: 2000 } } })
  trade(@Body() dto: { userId: number; fromCurrency: string; toCurrency: string; amount: number }) {
    return this.walletClient.send({ cmd: 'trade' }, dto);
  }

  @Get('transactions/:userId')
  @ApiOperation({ summary: 'Returns transaction history for a user' })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  getTransactions(@Param('userId') userId: string, @Query() filters: any) {
    return this.walletClient.send({ cmd: 'get_transactions' }, { userId: +userId, ...filters });
  }

  @Get('fx/rates')
  @ApiOperation({ summary: 'Retrieves FX rate for given currency pair' })
  @ApiQuery({ name: 'from', required: true })
  @ApiQuery({ name: 'to', required: true })
  getFxRates(@Query('from') from: string, @Query('to') to: string) {
    return this.fxClient.send({ cmd: 'get_fx_rates' }, { from, to });
  }
}
