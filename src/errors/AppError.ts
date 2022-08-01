import { HttpStatus } from '@nestjs/common';

interface IAppError {
  message: string;
  statusCode?: number;
  code?: string;
  params?: any;
}

class AppError {
  public readonly message: string;

  public readonly statusCode: HttpStatus;

  public readonly code?: string;

  public readonly params?: any;

  constructor({
    message,
    statusCode = HttpStatus.BAD_REQUEST,
    code,
    params,
  }: IAppError) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.params = params;
  }
}

export default AppError;
