import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reservation } from 'src/typeorm/entities/Reservation';
import { CreateReservationParams, UpdateReservationParams } from "src/utils/type";

@Injectable()
export class ReservationsService {

    constructor(
        @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
      ) {}

      findReservation() {
        return this.reservationRepository.find();
      }
    
      createReservation(reservationDetails: CreateReservationParams) {
        const newReservation = this.reservationRepository.create({
          ...reservationDetails,
          createAt: new Date(),
        });
        return this.reservationRepository.save(newReservation);
      }

      updateReservation(
        id: number, 
        updateReservationDetails: UpdateReservationParams) {
        return this.reservationRepository.update({ id }, { ...updateReservationDetails });
      }

      deleterReservation(id: number) {
        return this.reservationRepository.delete(id);
      }

      
}