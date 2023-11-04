import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TransportsModule } from './transports/transports.module';
import { User } from './typeorm/entities/User';
import { Profile } from './typeorm/entities/Profile';
import { Post } from './typeorm/entities/Post';
import { Escale } from './typeorm/entities/Escale';
import { Ville } from './typeorm/entities/Ville';
import { Driver } from './typeorm/entities/Drivers';
import { Transport } from './typeorm/entities/Transport';
import { Vehicule } from './typeorm/entities/Vehicule';
import { Compagnie } from './typeorm/entities/Compagnie';
import { CompagniesModule } from './compagnies/compagnies.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities: [User, Profile, Post, Escale, Ville, Driver, Transport, Vehicule, Compagnie],
      synchronize: true,
    }),
    UsersModule, TransportsModule,CompagniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
