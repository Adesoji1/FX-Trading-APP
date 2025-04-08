import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CacheModule, CACHE_MANAGER } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GatewayController } from './gateway.controller';
import { RedisThrottlerStorage } from './redis-throttler-storage.service';

@Module({
  imports: [
   
    ConfigModule.forRoot({ isGlobal: true }),

    /* ---------- cache (global) ---------- */
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        url: `redis://${config.get('REDIS_HOST', 'redis')}:${config.get(
          'REDIS_PORT',
          6379,
        )}`,
        ttl: config.get<number>('CACHE_TTL', 60),
      }),
    }),

    
    ThrottlerModule.forRootAsync({
      inject: [CACHE_MANAGER],
      useFactory: (cacheManager) => ({
        throttlers: [
          {
            name: 'global',   
            ttl: 6000,          
            limit: 1000,        
            blockDuration: 3000,        
          },
        ],
        storage: new RedisThrottlerStorage(cacheManager),
      }),
    }),

    
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: 'WALLET_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq:5672'],
          queue: 'wallet_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: 'FX_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq:5672'],
          queue: 'fx_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],

  controllers: [GatewayController],

  providers: [
    RedisThrottlerStorage,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
