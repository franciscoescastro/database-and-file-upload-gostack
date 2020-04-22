import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import CreateTransactionService from '../services/CreateTransactionService'
import TransactionsRepository from '../repositories/TransactionsRepository'
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router()

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository)

  const transactions = await transactionsRepository.all()
  const balance = await transactionsRepository.getBalance()

  return response.json({ transactions, balance })
})

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body

  const createTransactionService = new CreateTransactionService()
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    categoryTitle: category,
  })

  return response.json(transaction)
})

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
})

transactionsRouter.post('/import', async (request, response) => {
  // TODO
})

export default transactionsRouter
