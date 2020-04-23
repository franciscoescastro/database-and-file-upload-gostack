import { getRepository, getCustomRepository, Repository } from 'typeorm'
import AppError from '../errors/AppError'

import Transaction from '../models/Transaction'
import Category from '../models/Category'
import TransactionsRepository from '../repositories/TransactionsRepository'

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome'
  category: string
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  private categoriesRepository: Repository<Category>

  constructor() {
    this.transactionsRepository = getCustomRepository(TransactionsRepository)
    this.categoriesRepository = getRepository(Category)
  }

  public async execute({
    title,
    value,
    type,
    category: categoryTitle,
  }: Request): Promise<Transaction> {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    })

    if (transaction.isOutcome()) {
      const { total } = await this.transactionsRepository.getBalance()
      if (total < transaction.value)
        throw new AppError('Outcome cannot be bigger than total.')
    }

    let category = await this.categoriesRepository.findOne({
      where: { title: categoryTitle },
    })

    if (!category) {
      category = this.categoriesRepository.create({
        title: categoryTitle,
      })

      await this.categoriesRepository.save(category)
    }

    transaction.categoryId = category.id
    await this.transactionsRepository.save(transaction)

    return transaction
  }
}

export default CreateTransactionService
