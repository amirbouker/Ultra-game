import { Entity, Column, ObjectIdColumn } from 'typeorm';
@Entity()
export class Publisher {
  @ObjectIdColumn()
  _id: string;
  @Column()
  name: string;
  @Column()
  siret: number;
  @Column()
  phone: string;
}
