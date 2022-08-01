import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Square {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  rent: number;

  @Column()
  ownerId?: number;

  @Column()
  action: string;

  @CreateDateColumn()
  createdAt: string;
}
