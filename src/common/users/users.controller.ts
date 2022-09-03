import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const users = await this.usersService.create(createUserDto);
    if (users.error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        ...users,
      });
    } else {
      return res.json({
        users: users.users,
        message: 'success',
        statusCode: HttpStatus.CREATED,
        error: users.error,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    if (users.length) {
      return res.status(HttpStatus.OK).json({
        users,
        message: 'Data Retrieving successfull',
        statusCode: HttpStatus.OK,
        error: false,
      });
    } else {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'data not found',
        error: true,
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.findOne(id);
    if (user.error) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        ...user,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        ...user,
      });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    if (user.error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        ...user,
      });
    }
    return res.status(HttpStatus.CREATED).json({
      statuCode: HttpStatus.OK,
      ...user,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersService.remove(id);
    if (user) {
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Successfull to Delete',
        error: !user,
      });
    }
    throw new ForbiddenException({
      message: 'User Not Found',
      error: !user,
      statusCode: HttpStatus.FORBIDDEN,
    });
  }
}
