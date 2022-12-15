import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './gamesDto/createGameDto';
import { ObjectId } from 'mongodb';
import { SuccessDeletedResponse } from './types';
import { UpdateGameDto } from './gamesDto/updateGameDto';
import { Cron } from '@nestjs/schedule/dist';
import { GetMonths } from 'src/utils/getMonths';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: MongoRepository<Game>,
  ) {}
  //every-night-at-midnight
  @Cron('0 0 * * *')
  async handleCron() {
    const games = await this.gamesRepository.find({});
    for (const game of games) {
      const gameTime = new GetMonths().getMonthsFromDates(game.releaseDate);
      if (gameTime > 18) {
        await this.gamesRepository.deleteOne({ _id: game._id });
      }
      if (!game.discounted && gameTime < 18 && gameTime > 12) {
        await this.gamesRepository.findOneAndUpdate(
          { _id: game._id },
          {
            $set: {
              ...game,
              discounted: true,
              price: game.price - (game.price * 20) / 100,
            },
          },
        );
      }
    }
  }
  async findAll(): Promise<Game[]> {
    const games = await this.gamesRepository.find({
      where: {
        deletedAt: null,
      },
    });
    return games;
  }

  async findOne(id: string): Promise<Game> {
    const Id = new ObjectId(id);
    let response: Game;
    try {
      response = await this.gamesRepository.findOneBy({
        where: { _id: Id },
      });
    } catch (e) {
      throw new Error(e);
    }

    return response;
  }

  async remove(id: string): Promise<SuccessDeletedResponse> {
    const Id = new ObjectId(id);

    try {
      await this.gamesRepository.deleteOne({ _id: Id });
      return {
        deleted: true,
        message: 'Game with id : ' + id + ' deleted successfully',
      };
    } catch (e) {
      throw new Error(e);
    }
  }
  async create(gameInput: CreateGameDto): Promise<Game> {
    let input;
    if (gameInput.publisher)
      input = {
        ...gameInput,
        publisher: new ObjectId(gameInput.publisher),
      };
    if (!gameInput.publisher) throw new Error('invalid input');

    return await this.gamesRepository.save(input);
  }
  async update(updateGameInput: UpdateGameDto, id: string): Promise<any> {
    const Id = new ObjectId(id);
    return await this.gamesRepository.findOneAndUpdate(
      { _id: Id },
      {
        $set: { ...updateGameInput, discounted: false },
      },
    );
  }
}
