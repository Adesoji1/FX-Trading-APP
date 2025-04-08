import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Transaction, TransactionType, TransactionStatus } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {}


  async recordTransaction(data: {
    userId: number;
    type: TransactionType;
    currency: string;
    amount: number;
    status: TransactionStatus;
    rate?: number;
  }): Promise<Transaction> {
    // Validate that 'rate' is provided when needed always
    const requiresRate = ['convert', 'trade'] as TransactionType[];
    if (requiresRate.includes(data.type) && (data.rate === undefined || data.rate === null)) {
      throw new BadRequestException(`Rate is required for transaction type: ${data.type}`);
    }

    const tx = this.transactionRepo.create({
      userId: data.userId,
      type: data.type,
      currency: data.currency,
      amount: data.amount,
      status: data.status,
      rate: data.rate ?? undefined,
    });

    return this.transactionRepo.save(tx);
  }

 
  async getUserTransactions(
    userId: number,
    filters: {
      type?: TransactionType;
      status?: TransactionStatus;
      from?: string;
      to?: string;
    },
  ): Promise<Transaction[]> {
    const where: any = { userId };

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.from && filters.to) {
      where.createdAt = Between(new Date(filters.from), new Date(filters.to));
    }

    return this.transactionRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }
}
