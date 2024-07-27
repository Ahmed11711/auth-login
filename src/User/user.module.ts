import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./entity/user.entity";
import {OtpService} from '../User/otp.controller'
import {ResponseLaravel} from '../Response/responseLaravel.controller'
import { JwtService } from '@nestjs/jwt';




@Module({
    imports: [TypeOrmModule.forFeature([User]),
],
    controllers: [UserController],
    providers: [UserService,OtpService,ResponseLaravel],
})
export class UserModule {}
