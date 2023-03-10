import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherController } from './publisher.controller';
import { Publisher } from './publisher.entity';
import { PublisherService } from './publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher])],
  providers: [PublisherService],
  controllers: [PublisherController],
})
export class PublisherModule {}
