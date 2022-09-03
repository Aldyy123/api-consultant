import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { QueryFailedError, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

// Check phone number
@ValidatorConstraint({ async: true })
export class phoneValidatorConstraint implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const typeDataPhone = value.match(/[0-9]/i);
    if (value) {
      if (value.length >= 11 && typeDataPhone !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const typeDataPhone = validationArguments.value.match(/[0-9]/);
    if (typeDataPhone !== null) {
      return '$property musth be lenght greather than 11';
    }
    return '$property musth be number';
  }
}

export function phoneValidator(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: phoneValidatorConstraint,
    });
  };
}

// Check Validation Data Users
export async function validationDataUnique(
  users,
): Promise<{ error; message? }> {
  if (users) {
    return { error: true, message: 'Username Already Exist' };
  }
  return { error: false };
}

export async function validationDataNotFound(
  userServices,
  id,
  message?,
): Promise<{ error; message? }> {
  const users = await userServices.findOne(id);
  if (users) {
    return { error: false, message };
  }
  return { error: true, message: 'Users not found' };
}
