import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../Auth/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() creatUser: CreateUserDto) {
    this.userService.register(creatUser);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto) {
    return this.userService.login(loginUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Req() request: Request) {
    const userData = request.user;

    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() request: Request) {
    //  you don't need to make any logic on the controller layer
    // you can create decorator to  get the user token and decoding it .
    const userData = request.user;
    const token = userData.token;

    return this.userService.logout(token);
  }
}
