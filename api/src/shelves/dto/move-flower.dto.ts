import { IsString, IsNotEmpty  } from 'class-validator';

export class MoveFlowerDto {
  @IsNotEmpty()
  @IsString()
  shelfFromId: string;

  @IsNotEmpty()
  @IsString()
  shelfToId: string;

  @IsNotEmpty()
  @IsString()
  flowerId: string;
}