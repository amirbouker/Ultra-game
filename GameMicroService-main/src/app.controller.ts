import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { Game } from './games/game.entity';
import { GamesService } from './games/games.service';

@Controller()
export class AppController {
  constructor(private readonly gameService: GamesService) {}
  @MessagePattern({ cmd: 'game_service' })
  async getGames(): Promise<Game> {
    const games = await this.gameService.findAll();
    return games[0];
  }
  @Get('/test')
  test() {
    return 'pong';
  }
}
