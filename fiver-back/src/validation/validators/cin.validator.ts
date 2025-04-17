// src/validation/validators/cin.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { CIN_REGEX } from '../../config/CIN-pattern';

export function IsCIN(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCIN',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return CIN_REGEX.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Le numéro de CIN doit contenir exactement 11 chiffres.`;
        },
      },
    });
  };
}
