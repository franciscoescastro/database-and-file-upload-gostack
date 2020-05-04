import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import Category from './Category'

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  type: 'income' | 'outcome'

  @Column()
  value: number

  @Column({ name: 'category_id' })
  categoryId: string

  @ManyToOne(() => Category, category => category.transaction, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  public isIncome(): boolean {
    return this.type === 'income'
  }

  public isOutcome(): boolean {
    return this.type === 'outcome'
  }
}

export default Transaction
