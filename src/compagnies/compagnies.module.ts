import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compagnie } from 'src/typeorm/entities/Compagnie';
import { CompagniesController } from './controllers/compagnies/compagnies.controller';
import { CompagniesService } from './services/compagnies/compagnies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Compagnie])],
  controllers: [CompagniesController],
  providers: [CompagniesService]
})
export class CompagniesModule {}
