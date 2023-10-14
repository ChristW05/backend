import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { ReservationsService } from './services/reservations/reservations.service';
import { ReservationsController } from './controllers/reservations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}