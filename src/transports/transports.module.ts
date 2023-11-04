import { Module } from '@nestjs/common';
import { TransportsController } from './controllers/transports/transports.controller';
import { TransportsService } from './services/transports/transports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from 'src/typeorm/entities/Transport';
import { Vehicule } from 'src/typeorm/entities/Vehicule';
import { Driver } from 'src/typeorm/entities/Drivers';

@Module({
  imports: [TypeOrmModule.forFeature([Transport, Vehicule, Driver])],
  controllers: [TransportsController],
  providers: [TransportsService]
})
export class TransportsModule {}
