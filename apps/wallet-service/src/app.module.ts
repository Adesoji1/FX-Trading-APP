import { Module} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TransactionService } from './tranaction.service';
import { ConfigModule } from '@nestjs/config';
import KeyvRedis from '@keyv/redis';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: new KeyvRedis(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.WALLET_DB_HOST,
      port: parseInt(process.env.WALLET_DB_PORT ?? '5432'),
      username: process.env.WALLET_DB_USERNAME,
      password: process.env.WALLET_DB_PASSWORD,
      database: process.env.WALLET_DB_DATABASE,
      synchronize: true,
      entities: [Wallet, Transaction],
    }),
    TypeOrmModule.forFeature([Wallet, Transaction]),
  ],
  controllers: [WalletController],
  providers: [WalletService, TransactionService],
})
export class AppModule {}
