import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Todo } from '@interfaces/todos.interface';

@Entity()
export class TodoEntity extends BaseEntity implements Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  completed: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
