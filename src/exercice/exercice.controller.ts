import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ExerciceService } from './exercice.service';
import { CreateExerciceDto } from './dto/CreateExercice.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';

@Controller('exercice')
export class ExerciceController {
  constructor(private exerciceService: ExerciceService) {}

  @Get()
  async GetAllExercices() {
    return this.exerciceService.GetAllExercices();
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }
    return this.exerciceService.saveImage(file);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  async createExercice(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateExerciceDto,
  ) {
    if (!file) {
      throw new BadRequestException("L'image est obligatoire");
    }

    dto.image = file.filename;
    return this.exerciceService.CreateExercice(dto);
  }
  @Get(':id')
  async GetOneExercice(@Param('id') id: number) {
    return this.exerciceService.GetOneExercice(id);
  }

  @Delete('/delete/:id')
  async DeleteExercice(@Param('id') id: number) {
    return this.exerciceService.DeleteExercice(id);
  }
}
