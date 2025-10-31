import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, LoginUserDto } from './user.dto';
import { JwtAuthGuard } from './user-guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async createUser(@Body() dto: CreateUser) {
    return this.userService.createUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.userService.loginUser(dto);
  }
}
