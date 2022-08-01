import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Square } from './entities/square.entity';

@Injectable()
export class SquaresService {
  constructor(
    @InjectRepository(Square)
    private squareRepository: Repository<Square>,
  ) {}

  async findAll() {
    return await this.squareRepository.find();
  }
}
