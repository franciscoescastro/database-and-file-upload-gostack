import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import CreateTransactionService from '../services/CreateTransactionService'
import TransactionsRepository from '../repositories/TransactionsRepository'
import DeleteTransactionService from '../services/DeleteTransactionService'
import ImportTransactionsService from '../services/ImportTransactionsService'
import csvUpload from '../config/csvUpload'

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
    category,
  })

  return response.json(transaction)
})

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const deleteTransactionService = new DeleteTransactionService()
  deleteTransactionService.execute(id)

  response.status(201).send()
})

transactionsRouter.post(
  '/import',
  csvUpload.single('file'),
  async (request, response) => {
    const { file } = request
    const importTransactionsService = new ImportTransactionsService()
    const transactions = await importTransactionsService.execute(file)

    response.json(transactions)
  },
)

export default transactionsRouter
