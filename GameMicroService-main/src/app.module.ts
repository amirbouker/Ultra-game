import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormconfig';
import { GamesModule } from './games/game.module';

import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig()), GamesModule, PublisherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
