import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseLaravel } from '../Response/responseLaravel.controller';
import { OtpService } from '../User/otp.controller';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  // ResponseLaravel mustn't be treated as a provider based on the nest concepts
  providers: [UserService, OtpService, ResponseLaravel],
})
export class UserModule {}
