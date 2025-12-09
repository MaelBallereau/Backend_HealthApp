import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import type { JwtPayload } from '../type';
import { CreateUser } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async createUser(userData: CreateUser, file?: Express.Multer.File) {
    const [day, month, year] = userData.date_of_birth.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const avatarPath = file ? file.filename : null;
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        date_of_birth: formattedDate,
        avatar: avatarPath,
        height: Number(userData.height),
        weight: Number(userData.weight),
      },
    });
    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return {
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        connected: user.connected,
        date_of_birth: user.date_of_birth,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        goal: user.goal,
      },
      token,
    };
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

  async loginUser(userData: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const isValid = await bcrypt.compare(userData.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Mot de passe invalide');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwt.sign(payload);

    await this.prisma.user.updateMany({
      where: { id: user.id },
      data: { connected: true },
    });

    return {
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        connected: true,
        date_of_birth: user.date_of_birth,
        weight: user.weight,
        height: user.height,
        gender: user.gender,
        goal: user.goal,
      },
      token,
    };
  }
  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        email: true,
        username: true,
        avatar: true,
        role: true,
        connected: true,
        date_of_birth: true,
        weight: true,
        height: true,
        gender: true,
        goal: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    return user;
  }

  async updateUser(userId: number, userData: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: userData,
    });

    return updatedUser;
  }
}
