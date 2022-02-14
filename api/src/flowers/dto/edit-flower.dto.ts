import { IsString, IsNotEmpty } from 'class-validator';
import { CreateFlowerDto } from './create-flower.dto';

export class EditFlowerDto extends CreateFlowerDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
