import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { validationDataNotFound } from '../users/validations/validator';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { UserLogin } from './entities/user-login.entity';
import * as bycrpt from 'bcrypt'

@Injectable()
export class UserLoginService {
  constructor(
    @InjectRepository(UserLogin) private readonly usersLog: Repository<UserLogin>,
    private readonly userServices: UsersService
  ) { }
  async create(createUserLoginDto) {
    try {
    const userLogin = await this.findOne(createUserLoginDto.email)
    const user = await this.userServices.findOne(createUserLoginDto.username)
    if (user.error && userLogin.error) {
      const hash = await bycrpt.hash(createUserLoginDto.password, 15)
      createUserLoginDto.password = hash
      await this.userServices.create(createUserLoginDto)
      const newUser = await this.usersLog.save(createUserLoginDto)
      return newUser
    }
    const message = (!user.error) ? 'User Already Exist' : 'Email Has Beeen taken';
    return { error: !(user.error && userLogin.error), message }
      
    } catch (error) {
      console.log(error)
    }
  }

  findAll() {
    return `This action returns all userLogin`;
  }

  async findOne(email: string): Promise<{ error, message?, user?}> {
    const validation = await validationDataNotFound(this.usersLog, { email }, 'User Found')
    if (validation.error) {
      return validation
    }
    return { user: await this.usersLog.findOne(email), ...validation }
  }

  update(id: number, updateUserLoginDto: UpdateUserLoginDto) {
    return `This action updates a #${id} userLogin`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLogin`;
  }
}
