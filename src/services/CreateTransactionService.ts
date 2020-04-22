import { getRepository, getCustomRepository } from 'typeorm'
import AppError from '../errors/AppError'

import Transaction from '../models/Transaction'
import Category from '../models/Category'
import TransactionsRepository from '../repositories/TransactionsRepository'

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome'
  categoryTitle: string
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    categoryTitle,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category)

    let category = await categoriesRepository.findOne({
      where: { title: categoryTitle },
    })

    if (!category) {
      category = categoriesRepository.create({
        title: categoryTitle,
      })

      await categoriesRepository.save(category)
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository)
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      categoryId: category.id,
    })

    await transactionsRepository.save(transaction)

    return transaction
  }
}

export default CreateTransactionService
