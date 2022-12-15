import { Controller } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  async getPublisherById(publisherId: ObjectId) {
    return await this.publisherService.getPublisherById(publisherId);
  }
}
