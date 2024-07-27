import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Username must have atleast 3 characters.' })
  password: string;
}
