import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'tagValidate', async: false })
export class TagValidateTitle implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const regexp = /\D/;
    const isFirstLetter = text[0].match(regexp) ? true : false;
    const regexpSpace = /\s/g;
    const isExistsSpace = text.match(regexpSpace) ? false : true;
    return isFirstLetter && isExistsSpace;
  }

  defaultMessage(args: ValidationArguments) {
    return 'The tag must start with a letter and cannot contain spaces';
  }
}
