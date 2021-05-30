import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { UserRepository } from '../repositories/user.repository'
import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dtos'

@Injectable()
export class UserService {
  constructor (@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {}

  async getAll (): Promise<ReadUserDto[]> {
    const users = await this.userRepository.find()
    return users.map(user => plainToClass(ReadUserDto, user))
  }

  async getById (userId: number): Promise<ReadUserDto> {
    const foundUser = await this.userRepository.findOne(userId)
    if (!foundUser) {
      throw new NotFoundException('User does not exist')
    }
    return plainToClass(ReadUserDto, foundUser)
  }

  async create (createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const savedUser = await this.userRepository.save(createUserDto)
    return plainToClass(ReadUserDto, savedUser)
  }

  async update (userId: number, updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    const foundUser = await this.userRepository.findOne(userId)
    if (!foundUser) {
      throw new NotFoundException('User does not exist')
    }
    const savedUser = await this.userRepository.save(this.userRepository.merge(foundUser, updateUserDto))
    return plainToClass(ReadUserDto, savedUser)
  }

  async delete (userId: number): Promise<void> {
    const foundUser = await this.userRepository.findOne(userId)
    if (!foundUser) {
      throw new NotFoundException('User does not exist')
    }
    await this.userRepository.softRemove(foundUser)
  }
}
