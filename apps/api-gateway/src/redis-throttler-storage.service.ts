import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import {
  ThrottlerStorage,
} from '@nestjs/throttler';
import { ThrottlerStorageRecord } from '@nestjs/throttler/dist/throttler-storage-record.interface';

@Injectable()
export class RedisThrottlerStorage implements ThrottlerStorage {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  private blockedKey(key: string) {
    return `${key}:blocked`;
  }

  async increment(
    key: string,
    ttl: number,            
    limit: number,          
    blockDuration: number,  
  ): Promise<ThrottlerStorageRecord> {
    
    const blockedUntil = (await this.cache.get<number>(this.blockedKey(key))) ?? 0;
    const now = Date.now();

    if (blockedUntil > now) {
      return {
        totalHits: limit,                                 
        timeToExpire: ttl,
        isBlocked: true,
        timeToBlockExpire: Math.ceil((blockedUntil - now) / 1000),
      };
    }

    const currentHits = (await this.cache.get<number>(key)) ?? 0;
    const totalHits = currentHits + 1;

    await this.cache.set(key, totalHits, ttl);             

  
    if (totalHits > limit) {
      const until = now + blockDuration * 1000;            
      await this.cache.set(this.blockedKey(key), until, blockDuration);

      return {
        totalHits,
        timeToExpire: ttl,
        isBlocked: true,
        timeToBlockExpire: blockDuration,
      };
    }

    
    return {
      totalHits,
      timeToExpire: ttl,
      isBlocked: false,
      timeToBlockExpire: 0,
    };
  }

  
  async getRecord(key: string): Promise<number | undefined> {
    const val = await this.cache.get<number>(key);
    return val === null ? undefined : val;
  }

  async addRecord(key: string, ttl: number): Promise<void> {
    const current = (await this.cache.get<number>(key)) ?? 0;
    await this.cache.set(key, current + 1, ttl);
  }

  async resetKey(key: string): Promise<void> {
    await this.cache.del(key);
    await this.cache.del(this.blockedKey(key));
  }
}
