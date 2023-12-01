// import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
// import { MESSAGE, REGEX } from "src/app.utils";


export class CreateUserDto {

  // @IsNotEmpty()
  // nom: string;

  // @IsNotEmpty()
  // prenom: string;

  // @IsNotEmpty()
  // telephone: number;

  // @IsNotEmpty()
  // age: number;

  // @IsNotEmpty()
  // dob: string;

  // @IsNotEmpty()
  // @IsEmail()
  // email: string;
  
  // @IsNotEmpty()
  // @Length(8,24)
  // @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE,})
  // password: string;

  // @IsNotEmpty()
  // @Length(8,24)
  // @Matches(REGEX.PASSWORD_RULE, {message: MESSAGE.PASSWORD_RULE_MESSAGE,})
  // confirmPassword:string;
  
  // createAt: string;
  nom: string;
  prenom: string;
  telephone: string;
  age: number;
  dob: string;
  email: string;
  password: string;
  confirmPassword:string;
  createAt: string;
}

