import { EntityRepository, Repository } from 'typeorm'

import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async all(): Promise<Transaction[]> {
    const transactions = await this.find({
      select: [
        'id',
        'title',
        'value',
        'type',
        'category',
        'createdAt',
        'updatedAt',
      ],
      relations: ['category'],
    })

    return transactions
  }

  public async getBalance(): Promise<Balance> {
    const transactions = await this.find()

    const [income, outcome] = transactions.reduce(
      (accumulator, transaction) => {
        accumulator[transaction.isIncome() ? 0 : 1] += transaction.value
        return accumulator
      },
      [0, 0],
    )

    return {
      income,
      outcome,
      total: income - outcome,
    }
  }
}

export default TransactionsRepository
