import { IsString } from 'class-validator';

export class CreateCategoryDto {
  id: number;
  @IsString({ message: 'Le nom doit etre un string' })
  name: string;
}
