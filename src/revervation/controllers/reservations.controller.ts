import { 
  Body,
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post } from "@nestjs/common";
import { ReservationsService } from "../services/reservations/reservations.service";
import { CreateReservationDto } from "../dtos/CreateReservation.dto";
import { UpdateReservationDto } from "../dtos/UpdateReservation.dto";



@Controller('reservations')
export class ReservationsController {
  constructor(private reservationService: ReservationsService) {}
 

  @Get()
  getReservation() {
    return this.reservationService.findReservation();
  }

  @Post()
  createReservation(@Body() createReservationDto: CreateReservationDto) {
    console.log(createReservationDto);
    
    return this.reservationService.createReservation(createReservationDto);
  }

  @Patch(':id')
  async updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    console.log(updateReservationDto);
    
    await this.reservationService.updateReservation(id, updateReservationDto);
  }

  @Delete(':id')
  async deleteReservationById(@Param('id', ParseIntPipe) id: number) {
    await this.reservationService.deleterReservation(id);
  }
}