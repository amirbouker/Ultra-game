import { ObjectId } from 'mongodb';

export class UpdateGameDto {
  readonly title: string;
  readonly price: number;
  readonly tags: string[];
  readonly discounted: boolean;
  readonly releaseDate: Date;
  readonly publisher: ObjectId;
}
