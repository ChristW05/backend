import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateDriverDto } from 'src/transports/dtos/CreateDriverDto';
import { CreateTransportDto } from 'src/transports/dtos/CreateTransportDto';
import { CreateVehiculeDto } from 'src/transports/dtos/CreateVehiculeDto';
import { UpdateTransportDto } from 'src/transports/dtos/UpdateTransportDto';
import { UpdateVehiculeDto } from 'src/transports/dtos/UpdateVehiculeDto';
import { TransportsService } from 'src/transports/services/transports/transports.service';

@Controller('transports')
export class TransportsController {

    constructor(private transportService: TransportsService){}

    @Get()
    getTransports(){
        return  this.transportService.findTransports();
    }

    @Post()
    createTransport(@Body() createTransportDto: CreateTransportDto ){
        return this.transportService.createTransport(createTransportDto);
    }

    @Put(':id')
    async updateTransportById(
        @Param('id', ParseIntPipe) id:number,
        @Body() updtateTransportDto: UpdateTransportDto
        ) {
        await this.transportService.updateTransportById(id, updtateTransportDto)
    }

    @Delete(':id')
    async deleteTransportById(
        @Param('id', ParseIntPipe) id: number){
            await this.transportService.deleteTransport(id);
        }

    @Post(':id/vehicules')
    createVehicle(
        @Param('id' ,ParseIntPipe) id:number,
        @Body() createVehiclesDto: CreateVehiculeDto,
    ){
        return this.transportService.createVehicle(id, createVehiclesDto);
    }
    
    // @Post('/driver/:id/vehicules')
    // createVehicles(
    //     @Param('id' ,ParseIntPipe) id:number,
    //     @Body() createVehiclesDto: CreateVehiculeDto,
    // ){
    //     console.log(createVehiclesDto);
        
    //     return this.transportService.createVehicles(id, createVehiclesDto);
    // }

    @Put('/vehicule/:id')
    async updateVehiculeById(
        @Param('id', ParseIntPipe) id:number,
        @Body() updateVehiculeDto: UpdateVehiculeDto
        ){
        await this.transportService.updateVehiculeById(id, updateVehiculeDto);
    }

    @Delete('vehicule/:id')
    async deleteVehiculeById(@Param('id', ParseIntPipe) id:number){
        return this.transportService.deleteVehiculeById(id);
    }

    @Post('vehicule/:id/driver')
    async createDriver(
        @Param('id', ParseIntPipe) id:number,
        @Body() createDriverDetails:CreateDriverDto
        ){
        return this.transportService.createDriver(id, createDriverDetails)
    }

    @Put('driver/:id')
    async updateDriver(
        @Param('id', ParseIntPipe) id:number,
        @Body() createDriverDetails:CreateDriverDto
        ){
        return this.transportService.updateDriver(id, createDriverDetails)
    }

    @Put('/vehicule/:idv/driver/:id')
    async updateDriverVehicule(
        @Param('id', ParseIntPipe) id:number,
        @Param('idv', ParseIntPipe) idv:number,
        @Body() createDriverDetails:CreateDriverDto
        ){
        return this.transportService.updateDriverVehicule(id,idv, createDriverDetails)
    }

    @Delete('driver/:id')
    async deleteDriver(@Param('id', ParseIntPipe) id:number){
        return this.transportService.deleteDriver(id);
    }

    // @Post('/vehicule/:id/driver')
    // async createDriv( @Param('id', ParseIntPipe) id:number, @Body() createDriveDetail:CreateDriverDto ){
    //     return this.transportService.createDriver(id,createDriveDetail)
    // }   
}
