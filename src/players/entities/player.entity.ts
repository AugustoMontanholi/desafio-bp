import { PlayerType } from 'src/util/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  account: number;

  @Column()
  type: PlayerType;

  @Column()
  squareIndex: number;

  @Column()
  color: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  createdAt: string;
}
