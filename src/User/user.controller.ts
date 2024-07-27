import { Body, Controller, Get,Req, Post, UseGuards } from "@nestjs/common";
import {CreateUserDto} from './dto/create-user.dto'
import { UserService } from "./user.service";
import { LoginUserDto } from "./dto/login.dto";
import {JwtAuthGuard} from '../Auth/jwt.guard'
import { Request } from 'express';




@Controller()
export class UserController{
    constructor(private userService:UserService,
       
        
    ){}

    @Post()
     create(@Body() creatUser:CreateUserDto){

          this.userService.register(creatUser)
          
    }


    @Post('login')
    login(@Body() loginUser:LoginUserDto){

       return this.userService.login(loginUser)
     
   }

   @UseGuards(JwtAuthGuard)
   @Post('refresh')
   refresh(@Req() request:Request){

    const userData = request.user; 
  
    return userData;

   }

   @UseGuards(JwtAuthGuard)
   @Post('logout')
   logout(@Req() request:Request){
   const userData=request.user
   const token= userData.token

   return this.userService.logout(token)
   

    

   }

}