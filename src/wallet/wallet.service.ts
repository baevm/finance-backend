import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { CreateWalletDto, UpdateWalletDto } from './dto/wallet.dto'
import { Transaction } from './transaction.model'
import { Wallet } from './wallet.model'
import { WalletPageDto } from './dto/wallet-page.dto'
import { OperationType } from './types/OperationType.type'
import { TransactionDto, UpdateTransactionDto } from './dto/update-transaction.dto'

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet) private walletRepository: typeof Wallet,
    @InjectModel(Transaction) private transactionRepository: typeof Transaction
  ) {}

  async getWallets(userId: string) {
    return this.walletRepository.findAll({ where: { userId }, order: [['created_at', 'DESC']] })
  }

  async getWallet(walletId: string, userId: string) {
    const wallet = await this.walletRepository.findOne({ where: { id: walletId, userId } })

    if (!wallet) {
      throw new HttpException({ message: 'Кошелек не найден' }, HttpStatus.BAD_REQUEST)
    }

    return wallet
  }

  async getTransactions(userId: string, walletDto: WalletPageDto, operation_type: OperationType) {
    const wallet = await this.walletRepository.findOne({ where: { id: walletDto.id, userId } })

    if (!wallet) {
      throw new HttpException({ message: 'Кошелек не найден' }, HttpStatus.BAD_REQUEST)
    }

    return this.transactionRepository.findAll({
      where: { walletId: wallet.id, operation_type },
      offset: walletDto.skip,
      limit: walletDto.take,
      order: [['created_at', 'DESC']],
    })
  }

  async createWallet(dto: CreateWalletDto, userId: string) {
    return this.walletRepository.create({ title: dto.title, userId })
  }

  async updateWallet(dto: UpdateWalletDto, userId: string) {
    const wallet = await this.walletRepository.findOne({ where: { id: dto.walletId, userId } })

    if (!wallet) {
      throw new HttpException({ message: 'Кошелек не найден' }, HttpStatus.BAD_REQUEST)
    }

    return wallet.update({ title: dto.title })
  }

  async deleteWallet(walletId: string, userId: string) {
    const wallet = await this.walletRepository.findOne({ where: { id: walletId, userId } })

    if (!wallet) {
      throw new HttpException({ message: 'Кошелек не найден' }, HttpStatus.BAD_REQUEST)
    }

    return wallet.destroy()
  }

  async createTransaction(transactionDto: CreateTransactionDto, userId: string) {
    const wallet = await this.walletRepository.findOne({ where: { id: transactionDto.walletId, userId } })

    if (!wallet) {
      throw new HttpException({ message: 'Кошелек не найлен' }, HttpStatus.BAD_REQUEST)
    }

    const currentBalance = wallet.balance
    const transaction = await this.transactionRepository.create(transactionDto)
    let newBalance

    if (transactionDto.operation_type === 'INCOME') {
      newBalance = currentBalance + transactionDto.amount
      await wallet.update({ balance: newBalance })
    } else {
      newBalance = currentBalance - transactionDto.amount

      if (newBalance < 0) {
        throw new HttpException({ message: 'Недостаточно средств на счете' }, HttpStatus.BAD_REQUEST)
      }

      await wallet.update({ balance: newBalance })
    }

    return { transaction, balance: newBalance }
  }

  async updateTransaction(dto: UpdateTransactionDto, userId: string) {
    const wallet = await this.walletRepository.findOne({ where: { id: dto.walletId, userId } })

    if (!wallet) {
      throw new HttpException({ message: 'Кошелек не найден' }, HttpStatus.BAD_REQUEST)
    }

    const transaction = await this.transactionRepository.findOne({ where: { id: dto.id } })

    if (!transaction) {
      throw new HttpException({ message: 'Операция не найдена' }, HttpStatus.BAD_REQUEST)
    }

    return transaction.update({ title: dto.title })
  }

  async deleteTransaction(dto: TransactionDto, userId: string) {
    const wallet = await this.walletRepository.findOne({ where: { id: dto.walletId, userId } })

    if (!wallet) {
      throw new HttpException({ message: 'Кошелек не найден' }, HttpStatus.BAD_REQUEST)
    }

    const transaction = await this.transactionRepository.findOne({ where: { id: dto.id } })

    if (!transaction) {
      throw new HttpException({ message: 'Операция не найдена' }, HttpStatus.BAD_REQUEST)
    }

    return transaction.destroy()
  }
}
