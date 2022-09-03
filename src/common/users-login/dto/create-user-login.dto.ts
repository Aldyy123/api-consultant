import {
  IsDateString,
  IsEmail,
  Min,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly username: string;

  private readonly created_at: string;

  private readonly last_active: string;
}
