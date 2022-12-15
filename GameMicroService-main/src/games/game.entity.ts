import { ObjectId } from 'mongodb';
import { Entity, Column, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Publisher } from './types';

@Entity()
export class Game {
  @ObjectIdColumn()
  _id: string;
  @Column()
  title: string;
  @Column()
  price: number;
  @Column()
  discounted: boolean;
  @Column()
  tags: string[];
  @Column()
  publisher: ObjectId;
  @Column()
  releaseDate: Date;
}
