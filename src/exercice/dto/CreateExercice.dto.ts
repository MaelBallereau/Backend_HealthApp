import { IsString, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExerciceDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;

  @IsString({
    message: "Le nom de l'exercice doit être une chaîne de caractères",
  })
  name: string;

  @IsString({
    message: "La description de l'exercice doit être une chaîne de caractères",
  })
  description: string;

  @IsString()
  image?: string;

  @IsInt({ message: "L'ID de catégorie doit être un nombre" })
  @Type(() => Number)
  categoryId: number;
}
