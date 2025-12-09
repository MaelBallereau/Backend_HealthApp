import { Module } from '@nestjs/common';
import { ExerciceService } from './exercice.service';
import { ExerciceController } from './exercice.controller';
import { PrismaService } from 'src/prisma.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports:[
    MulterModule.register({
      storage: diskStorage({
        destination: '/public/uploads/avatars/',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Seuls les fichiers images sont autorisés!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, 
      },
    }),
  ],
  providers: [ExerciceService, PrismaService],
  controllers: [ExerciceController]
})
export class ExerciceModule {}
