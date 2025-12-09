import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { CreateUser } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { JwtAuthGuard } from './user-guard';
import type { Request, Response } from 'express';
import type { JwtPayload } from '../type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage : diskStorage({
        destination: "public/uploads/avatars",
        filename: (req, file, callback) => {
           const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
           const ext = extname(file.originalname);
          callback(null, `avatar-${uniqueSuffix}${ext}`);
        }
      }),
      fileFilter(req, file, callback) {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return callback(new Error('Seules les images en jpg, png , webp'), false);
        }
        callback(null,true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      }
    })
  )
  async createUser(@Body() dto: CreateUser,@UploadedFile() file:Express.Multer.File) {

    return this.userService.createUser(dto , file);
  }
  @Post('login')
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    const { token, user, message } = await this.userService.loginUser(dto);
    res.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res.json({ user, message });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request & { user: JwtPayload }) {
    return this.userService.validate(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Req() req: Request & { user: JwtPayload }, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('Authentication');
    return res.json({ success: true });
  }
}
