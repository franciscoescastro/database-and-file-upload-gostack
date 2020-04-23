import csv from 'csv-parse'
import fs from 'fs'
import Transaction from '../models/Transaction'
import CreateTransactionService from './CreateTransactionService'

interface TransactionRow {
  title: string
  value: number
  type: 'income' | 'outcome'
  category: string
}

class ImportTransactionsService {
  async execute(file: Express.Multer.File): Promise<Transaction[]> {
    const transactionRows: TransactionRow[] = await this.getFileRows(file.path)

    return this.saveRows(transactionRows)
  }

  private async getFileRows(filePath: string): Promise<TransactionRow[]> {
    const csvRows: TransactionRow[] = []
    const stream = fs
      .createReadStream(filePath)
      .pipe(csv({ columns: true, trim: true, cast: true }))
      .on('data', row => csvRows.push(row))
    await new Promise(resolve => {
      stream.on('end', resolve)
    })
    fs.unlinkSync(filePath)

    return csvRows
  }

  private async saveRows(csvRows: TransactionRow[]): Promise<Transaction[]> {
    const createTransactionService = new CreateTransactionService()
    const transactions: Transaction[] = []

    for (let i = 0; i < csvRows.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const transaction = await createTransactionService.execute(csvRows[i])
      transactions.push(transaction)
    }

    return transactions
  }
}

export default ImportTransactionsService
