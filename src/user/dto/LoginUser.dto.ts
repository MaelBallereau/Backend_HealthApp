import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail(
    {
      blacklisted_chars: "!@#$%^&*()_+={}[]|\:;'<>,/?",
    },
    {
      message: "L'email doit être une adresse email valide",
    },
  )
  @IsNotEmpty({
    message: "L'email est requis",
  })
  email: string;

  @MinLength(8)
  @IsNotEmpty({
    message: 'Le mot de passe est requis',
  })
  password: string;
}
