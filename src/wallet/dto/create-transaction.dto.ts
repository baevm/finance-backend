import { IsIn, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator'
import { OperationType, OperationTypes } from '../types/OperationType.type'

export class CreateTransactionDto {
  @IsUUID('all', { message: 'Некорректный ID кошельека' })
  walletId: string

  @IsIn(OperationTypes, { message: 'Неверный тип операции' })
  operation_type: OperationType

  @IsNumber()
  @IsPositive({ message: 'Сумма не должна быть отрицательным числом' })
  amount: number

  @IsString()
  title: string
}
