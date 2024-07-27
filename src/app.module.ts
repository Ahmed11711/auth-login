import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConnectDatabase from './config/database'
import {UserModule} from './User/user.module'
import { APP_INTERCEPTOR } from '@nestjs/core';
 import { ResponseInterceptor } from './Response/response.interceptor';  
 import { JwtModule } from '@nestjs/jwt';
 import { User } from './User/entity/user.entity';

 

@Module({
  imports: [TypeOrmModule.forRoot(ConnectDatabase),UserModule,


    JwtModule.register({
      global: true,
      secret: "ahmed",
      signOptions: { expiresIn: '60s' },
    }),
  ],
 
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class AppModule {}
