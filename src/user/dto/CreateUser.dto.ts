import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUser {
  @IsNotEmpty({
    message: "Le nom d'utilisateur est requis",
  })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  username: string;
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
  @IsString({
    message: "Le mot de passe doit être une chaîne de caractères",
  })
  @MinLength(8, {
    message: "Le mot de passe doit contenir au moins 8 caractères",
  })
  @IsNotEmpty({
    message: "Le mot de passe est requis",
  })
  password: string;

  @IsString({
    message: "La date de naissance doit être une chaîne de caractères",
  })
  @IsNotEmpty({
    message: "La date de naissance est requise",
  })
  date_of_birth: string;

  @IsNumber()
  @IsNotEmpty({
    message: "Le poids est requis",
  })
  weight: string;

  @IsNumber()
  @IsNotEmpty({
    message: "La taille est requise",
  })
  height: string;

  @IsString({
    message: "Le genre doit être une chaîne de caractères",
  })
  @IsNotEmpty({
    message: "Le genre est requis",
  })
  gender: string;

  @IsString({
    message: "Le but doit être une chaîne de caractères",
  })
  @IsNotEmpty({
    message: "Le but est requis",
  })
  goal: string;

  avatar?: string;
}
