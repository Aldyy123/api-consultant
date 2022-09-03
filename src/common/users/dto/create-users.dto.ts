import { Gender, Users } from '../entities/users.entity';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { phoneValidator } from '../validations/validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'value $property not valid',
  })
  readonly gender: Gender;

  @IsOptional()
  readonly address: string;

  @IsOptional()
  readonly img_profile: string;

  @phoneValidator()
  readonly phone: string;
}
