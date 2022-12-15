import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ObjectId } from 'mongodb';
import { PublisherService } from 'src/publisher/publisher.service';

import { GamesService } from './games.service';
import { CreateGameDto } from './gamesDto/createGameDto';
import { UpdateGameDto } from './gamesDto/updateGameDto';

@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly publisherService: PublisherService,
  ) {}
  @MessagePattern({ cmd: 'game_service_publisher' })
  @Get()
  async getPublisherByGameId(gameId: string) {
    const game = await this.gamesService.findOne(gameId);
    return await this.publisherService.getPublisherById(game.publisher);
  }

  @MessagePattern({ cmd: 'game_service_getAll' })
  @Get()
  async getAllGames() {
    const response = [];
    const res = await this.gamesService.findAll();
    for (const game of res) {
      response.push({
        ...game,
        publisher: await this.publisherService.getPublisherById(game.publisher),
      });
    }
    return response;
  }
  @MessagePattern({ cmd: 'game_service_getById' })
  @Get()
  async getGameById(id: string) {
    const res = await this.gamesService.findOne(id);
    return {
      ...res,
      publisher: await this.publisherService.getPublisherById(res.publisher),
    };
  }
  @MessagePattern({ cmd: 'game_service_update' })
  @Post()
  async updateGameById(data: { updateGameInput: UpdateGameDto; id: string }) {
    const input = {
      ...data.updateGameInput,
      publisher: new ObjectId(data.updateGameInput.publisher),
    };
    const res = await this.gamesService.update(input, data.id);
    if (res.ok === 1) {
      const updatedGame = await this.gamesService.findOne(res.value._id);
      return {
        ...updatedGame,
        publisher: await this.publisherService.getPublisherById(
          updatedGame.publisher,
        ),
      };
    }
  }
  @MessagePattern({ cmd: 'game_service_delete' })
  @Post()
  async deleteGameById(id: string) {
    return await this.gamesService.remove(id);
  }
  @MessagePattern({ cmd: 'game_service_create' })
  @Post()
  async createGame(@Body() gameInput: CreateGameDto) {
    const input = {
      title: gameInput.title,
      price: gameInput.price,
      tags: gameInput.tags ?? [],
      releaseDate: gameInput.releaseDate ?? new Date(),
      publisher: gameInput.publisher,
      discounted: false,
    };

    const res = await this.gamesService.create(input);
    return {
      ...res,
      publisher: await this.publisherService.getPublisherById(res.publisher),
    };
  }
}
