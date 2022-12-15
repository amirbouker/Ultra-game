import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import {
  BadRequest,
  Game,
  GameInput,
  Publisher,
  SuccessDeletedResponse,
} from './types';

@ApiTags('game')
@Controller('game')
export class AppController {
  constructor(@Inject('GAME_SERVICE') private client: ClientProxy) {}
  @ApiOperation({ summary: 'Get All Games' })
  @ApiResponse({
    status: 200,
    description: 'return all games',
    type: [Game],
  })
  @Get()
  getGames() {
    return this.client.send({ cmd: 'game_service_getAll' }, '');
  }
  @ApiOperation({ summary: 'Get Game By Id' })
  @ApiResponse({
    status: 200,
    description: 'return game by Id',
    type: Game,
  })
  @Get(':id')
  getGameById(@Param('id') id: string) {
    return this.client.send({ cmd: 'game_service_getById' }, id);
  }
  @ApiOperation({ summary: 'Get Publisher By gameId' })
  @ApiResponse({
    status: 200,
    description: 'return publisher by gameId',
    type: Publisher,
  })
  @Get('/publisher/:gameId')
  getPublisherByGameId(@Param('gameId') gameId: string) {
    return this.client.send({ cmd: 'game_service_publisher' }, gameId);
  }
  @ApiOperation({ summary: 'Update Game By Id' })
  @ApiBody({ description: 'GameInput', type: GameInput })
  @ApiResponse({
    status: 200,
    description: 'update game by Id',
    type: Game,
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: BadRequest,
  })
  @Post('/update/:id')
  updateGameById(@Body() updateGameInput: GameInput, @Param('id') id: string) {
    const data = { updateGameInput, id };

    return this.client.send({ cmd: 'game_service_update' }, data);
  }
  @ApiOperation({ summary: 'Delete Game By Id' })
  @ApiResponse({
    status: 200,
    description: 'delete game by Id',
    type: SuccessDeletedResponse,
  })
  @Post('/delete/:id')
  deleteGameById(@Param('id') id: string) {
    return this.client.send({ cmd: 'game_service_delete' }, id);
  }
  @ApiOperation({ summary: 'Create Game' })
  @Post('/create')
  @ApiBody({ description: 'GameInput', type: GameInput })
  @ApiResponse({
    status: 200,
    description: 'create a game',
    type: Game,
  })
  @ApiResponse({
    status: 400,
    description: 'bad request',
    type: BadRequest,
  })
  createGame(@Body() gameInput: GameInput) {
    return this.client.send({ cmd: 'game_service_create' }, gameInput);
  }
}
