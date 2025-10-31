
export class CreateUser {

  username: string;
  email: string;
  password: string;
  date_of_birth: string;
  weight: number;
  height: number;
  gender: string;
  goal: string;
  avatar?: string;
}

export class LoginUserDto {
  isEmail(): string {
    return "";
  }

  email: string;
  
  password: string;
  weight?: number;
  height?: number;
  gender?: string;
  goal?: string;
  connected?: boolean;
}

export class UpdateUserDto {
  avatar?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  weight?: number;
  height?: number;
  gender?: string;
  goal?: string;
  connected?: boolean;
}