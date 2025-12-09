import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateExerciceDto } from './dto/CreateExercice.dto';
@Injectable()
export class ExerciceService {
  constructor(private prisma: PrismaService) {}

  async GetAllExercices() {
    return this.prisma.exercice.findMany();
  }

  async GetOneExercice(id: number) {
    try {
      await this.prisma.exercice.findUnique({ where: { id } });
    } catch (error) {
      return { error: error };
    }
  }

  async saveImage(file: Express.Multer.File) {
    return {
      message: 'Image uploadée avec succès',
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: `/upload/image/${file.filename}`,
    };
  }

  async CreateExercice(dataExercice: CreateExerciceDto) {
    try {
      const image = dataExercice.image ? dataExercice.image :"";
      await this.prisma.exercice.create({
        data: {
          name: dataExercice.name,
          description: dataExercice.description,
          image:image,
          categoryId: dataExercice.categoryId,
        },
      });
    } catch (error) {
      return { error: error };
    }
  }
  async DeleteExercice(id: number) {
    try {
      await this.prisma.exercice.delete({ where: { id } });
    } catch (error) {
      return { error: error };
    }
  }
}
