import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Post } from './typeorm/entities/Post';
import { Escale } from './typeorm/entities/Escale';
import { Ville } from './typeorm/entities/Ville';
import { Driver } from './typeorm/entities/Drivers';
import { Transport } from './typeorm/entities/Transport';
import { Vehicule } from './typeorm/entities/Vehicule';
import { Compagnie } from './typeorm/entities/Compagnie';
import { JwtModule } from '@nestjs/jwt';
import { ProjetModule } from './projet/projet.module';
import { LogoCooperative } from './typeorm/entities/LogoCooperative';
import { ImageVoiture } from './typeorm/entities/ImageVoiture';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      entities: [User,Post, Escale, Ville, Driver, Transport, Vehicule, Compagnie, LogoCooperative, ImageVoiture],
      synchronize: true,
    }),
    ProjetModule,
    JwtModule.register({
      secret : 'secret',
      signOptions : {expiresIn: '1d'}
    })
]
})
//   controllers: [AppController],
//   providers: [AppService],
export class AppModule {}