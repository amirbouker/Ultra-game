import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Publisher } from './publisher.entity';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private publisherRepository: MongoRepository<Publisher>,
  ) {}

  async getPublisherById(publisherId: ObjectId): Promise<Publisher> {
    const res = await this.publisherRepository.findOneBy({ _id: publisherId });
    return res;
  }
  // async createPublisher(data: Publisher): Promise<Publisher> {
  //   const res = await this.publisherRepository.save(data);
  //   return res;
  // }
}
