import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): Record<string, any> {
    return { up: 'OK' };
  }
}
