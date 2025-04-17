// libs/common/exceptions/base.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}

export class CINVerificationFailedException extends AppException {
  constructor() {
    super('Numéro de CIN invalide ou non vérifié.', HttpStatus.UNAUTHORIZED);
  }
}
