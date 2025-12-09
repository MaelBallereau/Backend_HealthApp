import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async GetAllCategories() {
    return this.prisma.category.findMany();
  }

  async GetOneCategory(id: number) {
    try {
      await this.prisma.category.findUnique({ where: { id } });
    } catch (error) {
      return { error: error };
    }
  }

  async CreateCategory(dataCategory: CreateCategoryDto) {
    try {
      await this.prisma.category.create({ data: dataCategory });
    } catch (error) {
      return { error: error };
    }
  }
}
