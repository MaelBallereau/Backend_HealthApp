import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Get, Post, Body, Param } from '@nestjs/common';
import { CreateCategoryDto } from './dto/CreateCategory.dto';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService){}

    @Get()
    async GetAllCategories() {
        return this.categoryService.GetAllCategories();
    }

    @Get(':id')
    async GetOneCategory(@Param('id') id: number) {
        return this.categoryService.GetOneCategory(id);
    }

    @Post('/create')
    async CreateCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.CreateCategory(dto);
    }
}
