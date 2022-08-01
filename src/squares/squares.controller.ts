import { Controller, Get } from '@nestjs/common';

import { SquaresService } from './squares.service';

@Controller('squares')
export class SquaresController {
  constructor(private readonly squaresService: SquaresService) {}

  @Get()
  findAll() {
    return this.squaresService.findAll();
  }
}
