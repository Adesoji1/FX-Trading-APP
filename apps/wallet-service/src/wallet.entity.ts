import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // Stores balances like: { NGN: 1000, USD: 10 }
  @Column({ type: 'jsonb', default: {} })
  balances: Record<string, number>;
}
