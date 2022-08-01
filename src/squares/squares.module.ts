import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Square } from './entities/square.entity';
import { SquaresService } from './squares.service';
import { SquaresController } from './squares.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Square])],
  controllers: [SquaresController],
  providers: [SquaresService],
  exports: [SquaresService],
})
export class SquaresModule {}
