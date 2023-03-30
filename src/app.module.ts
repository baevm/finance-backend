import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { WalletController } from './wallet/wallet.controller'
import { WalletService } from './wallet/wallet.service'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { AuthModule } from './auth/auth.module'
import { WalletModule } from './wallet/wallet.module'
import { UserModule } from './user/user.module'
import { Wallet } from './wallet/wallet.model'
import { User } from './user/user.model'
import { Transaction } from './wallet/transaction.model'

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'finance-db',
      models: [Wallet, User, Transaction],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    WalletModule,
    UserModule,
  ],
  controllers: [AuthController, WalletController, UserController],
  providers: [AuthService, WalletService, UserService],
})
export class AppModule {}
