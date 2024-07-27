import { Body, Injectable ,UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import {OtpService} from '../User/otp.controller';
import {ResponseLaravel} from '../Response/responseLaravel.controller';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';






@Injectable()

export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepositry:Repository<User>,
        private OtpService:OtpService,
        private responseLaravel:ResponseLaravel,
        private jwtService: JwtService
    ){}

   async  register(creatUser){

         const gnrate_otp=this.gnrateOtp()
         this.OtpService.sendOtpEmail(creatUser.email,gnrate_otp)
         creatUser.otp=gnrate_otp
         const hash_password= await bcrypt.hash(creatUser.password, 10)
         creatUser.password=hash_password
         this.userRepositry.save(creatUser)
         
         
    }


 async   login(loginuser){
        const { email, password } = loginuser;
        const user = await this.userRepositry.findOne({ where: { email } });
        if (!user) {
          throw new UnauthorizedException ('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
        
        if (!isPasswordValid) {   
          throw new UnauthorizedException ('Invalid email or password');
        }
        const payload = { id: user.id, username: user.name };
        
      
         const access_token= await this.jwtService.signAsync(payload)

        
         
  

         const userWithToken = {
          ...user,
          access_token,
        };
    
        return this.responseLaravel.success(userWithToken);
    }


    findOne(id)
    {
      return this.userRepositry.findBy(id)
    }


    logout(token){
        this.jwtService.decode(token)
      return this.responseLaravel.success("Logged out successfully");
    }



    gnrateOtp(){
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        return otp;
    }
}