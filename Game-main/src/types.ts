import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsString,
  IsNumber,
  ArrayNotEmpty,
} from 'class-validator';

export class Publisher {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: Number })
  siret: number;
  @ApiProperty({ type: String })
  phone: string;
}
export class Game {
  @ApiProperty({ type: String })
  _id: string;
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: Number })
  price: number;
  @ApiProperty({ type: Boolean })
  discounted: boolean;
  @ApiProperty({ type: [String] })
  tags: string[];
  @ApiProperty({ type: Publisher })
  publisher: Publisher;
  @ApiProperty({ type: Date })
  releaseDate: Date;
}

export class GameInput {
  @IsString()
  @ApiProperty({ type: String })
  title: string;
  @IsNumber()
  @ApiProperty({ type: Number })
  price: number;
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: [String] })
  tags: string[];
  @IsDateString()
  @ApiProperty({ type: Date })
  releaseDate: Date;
  @IsString()
  @ApiProperty({ type: String })
  publisher: string;
}
export class SuccessDeletedResponse {
  @ApiProperty({ type: Boolean })
  deleted: boolean;
  @ApiProperty({ type: String })
  message: string;
}
export class BadRequest {
  @ApiProperty({ type: Number })
  statusCode: number;
  @ApiProperty({ type: [String] })
  message: string[];
  @ApiProperty({ type: String })
  error: string;
}
