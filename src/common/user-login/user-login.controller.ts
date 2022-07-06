import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';

@Controller('user-login')
export class UserLoginController {
  constructor(private readonly userLoginService: UserLoginService) {}

  @Post()
  create(@Body() createUserLoginDto: CreateUserLoginDto) {
    console.log(createUserLoginDto)
    return this.userLoginService.create(createUserLoginDto);
  }

  @Get()
  findAll() {
    return this.userLoginService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.userLoginService.findOne(email);
    if(user.error){
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        ...user
      })
    }
    return 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLoginDto: UpdateUserLoginDto) {
    return this.userLoginService.update(+id, updateUserLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLoginService.remove(+id);
  }
}
