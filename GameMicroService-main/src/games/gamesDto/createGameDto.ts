import { ObjectId } from 'mongodb';

export class CreateGameDto {
  readonly title: string;
  readonly price: number = 0;
  readonly tags: string[];
  readonly discounted: boolean = false;
  readonly releaseDate: Date = null;
  readonly publisher: ObjectId;
}
