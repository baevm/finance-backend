import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getMe(id: string) {
    return this.userRepository.findOne({ where: { id }, attributes: { exclude: ['password', 'hashedRt'] } })
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } })
  }

  async findById(id: string) {
    return this.userRepository.findOne({ where: { id } })
  }

  async createUser(username: string, password: string) {
    return this.userRepository.create({ password, username })
  }

  async updateUser(user: Partial<User>) {
    return this.userRepository.update({ ...user }, { where: { id: user.id } })
  }
}
