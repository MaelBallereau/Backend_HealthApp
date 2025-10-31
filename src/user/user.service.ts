import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUser, LoginUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
dotenv.config();

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async createUser(userData: CreateUser) {
    const [day, month, year] = userData.date_of_birth.split('/');
    const formattedDate = new Date(`${year}-${month}-${day}`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        date_of_birth: formattedDate,
      },
    });
    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return {
      message: 'Utilisateur créé avec succès',
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
      },
      token,
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

    await this.prisma.user.update({
      where: { id: user.id },
      data: { connected: true },
    });

    return {
      message: 'Connexion réussie',
      user: {
        id: user.id,
        email: user.email,
        name: user.username,
      },
      token,
    };
  }
}
