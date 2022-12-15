import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from 'src/publisher/publisher.entity';
import { PublisherService } from 'src/publisher/publisher.service';
import { Game } from './game.entity';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Publisher]),
    ScheduleModule.forRoot(),
  ],
  providers: [GamesService, PublisherService],
  controllers: [GamesController],
})
export class GamesModule {}
