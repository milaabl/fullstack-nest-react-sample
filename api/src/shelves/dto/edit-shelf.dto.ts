import { IsString, IsNotEmpty  } from 'class-validator';
import { CreateShelfDto } from './create-shelf.dto';

export class EditShelfDto extends CreateShelfDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
