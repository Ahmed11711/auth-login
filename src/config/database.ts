import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import * as dotenv from 'dotenv';

dotenv.config();


const ConnectDatabase: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // Set to false in production
  };

 

  export default ConnectDatabase;
  