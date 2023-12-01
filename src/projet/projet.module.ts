import { Module } from '@nestjs/common';
import { ProjetController } from './projet.controller';
import { ProjetService } from './projet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from 'src/typeorm/entities/Transport';
import { User } from 'src/typeorm/entities/User';
import { Compagnie } from 'src/typeorm/entities/Compagnie';
import { Escale } from 'src/typeorm/entities/Escale';
import { Vehicule } from 'src/typeorm/entities/Vehicule';
import { Driver } from 'src/typeorm/entities/Drivers';
import { Post } from 'src/typeorm/entities/Post';
import { Ville } from 'src/typeorm/entities/Ville';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Transport,User,Compagnie,Escale,Vehicule,Driver,Post,Ville])],
  controllers: [ProjetController],
  providers: [ProjetService, JwtService]
})
export class ProjetModule {}
