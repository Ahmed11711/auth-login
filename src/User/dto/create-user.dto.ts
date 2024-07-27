import { IsEmail, IsString, MinLength } from "class-validator"

 
 
export class CreateUserDto{

   @IsString()
    name:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(6, { message: 'Username must have atleast 3 characters.' })
    password:string
}