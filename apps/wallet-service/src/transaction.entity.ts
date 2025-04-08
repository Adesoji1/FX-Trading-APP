
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type TransactionType = 'fund' | 'convert' | 'trade';
export type TransactionStatus = 'success' | 'failed';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'varchar' })
  type: TransactionType;

  @Column({ type: 'varchar' })
  currency: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 12, scale: 6, nullable: true })
  rate?: number;

  @Column({ type: 'varchar' })
  status: TransactionStatus;

  @CreateDateColumn()
  createdAt: Date;
}





