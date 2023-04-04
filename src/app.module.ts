import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { UserController } from './user/user.controller'
import { User } from './user/user.model'
import { UserModule } from './user/user.module'
import { Transaction } from './wallet/transaction.model'
import { WalletController } from './wallet/wallet.controller'
import { Wallet } from './wallet/wallet.model'
import { WalletModule } from './wallet/wallet.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
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
  providers: [],
})
export class AppModule {}
