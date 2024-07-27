import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import ConnectDatabase from './config/database';

@Module({
  imports: [
    TypeOrmModule.forRoot(ConnectDatabase),
    UserModule,

    JwtModule.register({
      global: true,
      secret: 'ahmed',
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
