import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { QueryFailedError, Repository } from 'typeorm'
import { validationDataUnique, validationDataNotFound } from './validations/validator';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userService: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<{ error, users?, message?}> {
    const users = await this.userService.findOne({ username: createUserDto.username })
    const validation = await validationDataUnique(users)
    try {
      if (validation.error) {
        return validation
      } else {
        return { users: await this.userService.save(createUserDto), error: validation.error }
      }
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.errno === 1062) {
        return {
          error: true,
          message: 'Phone number already exist'
        }
      }
    }
  }

  findAll() {
    return this.userService
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.role_id', 'role')
      .getMany()
  }

  async findOne(id: string): Promise<{ error, message?, user?}> {
    const validation = await validationDataNotFound(this.userService, {username: id}, 'Retviewing data')
    if (validation.error) {
      return validation
    }
    const user = await this.userService
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.role_id', 'role')
    .where('user.username = :username', {username: id})
    .getOne()
    return { user, error: validation.error, message: 'Data Success' }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const validation = await validationDataNotFound(this.userService, {username:id}, 'Data Has been update')
    try {
      if (validation.error) {
        return validation
      }
      const user = await this.userService.update(id, updateUserDto)
      return { ...validation, user }
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.errno === 1062) {
        return {
          error,
          message: 'Dont can update, because username duplicate error'
        }
      }
    }
  }

  async remove(id: string) {
    const userExist = await this.findOne(id)
    if (!userExist.error) {
      await this.userService.delete(userExist.user.username)
      return true
    }
    return false
  }
}
