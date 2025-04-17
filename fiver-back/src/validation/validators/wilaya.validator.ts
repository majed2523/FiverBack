// src/validation/validators/wilaya.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { WILAYAS } from '../../config/wilaya-pattern';

export function IsWilaya(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isWilaya',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return WILAYAS.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `La wilaya '${args.value}' n'est pas valide.`;
        },
      },
    });
  };
}
