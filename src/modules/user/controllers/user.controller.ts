import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dtos'

@Controller('users')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Get()
  async getAll (): Promise<ReadUserDto[]> {
    const data = await this.userService.getAll()
    return data
  }

  @Get(':userId')
  async get (@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return await this.userService.getById(userId)
  }

  @Post()
  async create (@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    return await this.userService.create(createUserDto)
  }

  @Patch(':userId')
  async update (@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto): Promise<ReadUserDto> {
    return await this.userService.update(userId, updateUserDto)
  }

  @Delete(':userId')
  @HttpCode(204)
  async delete (@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    await this.userService.delete(userId)
  }
}
