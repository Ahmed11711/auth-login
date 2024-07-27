import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/User/user.service';
 

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService:UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const token = authHeader.replace('Bearer ', '');
    
    try {
      const decoded = this.jwtService.verify(token);
      
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }
      const user = await this.userService.findOne(decoded.id);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request.user = user;
      request.user.token = token;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

}
