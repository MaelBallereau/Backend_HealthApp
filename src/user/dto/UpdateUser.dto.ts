import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  avatar?: string;
  @IsString()
  username?: string;
  @IsEmail()
  email?: string;
  @MinLength(8)
  password?: string;
  @IsString()
  role?: string;
  @IsNumber()
  weight?: number;
  @IsNumber()
  height?: number;
  @IsString()
  gender?: string;
  @IsString()
  goal?: string;
}
