import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTransportDto } from 'src/transports/dtos/UpdateTransportDto';
import { Driver } from 'src/typeorm/entities/Drivers';
import { Transport } from 'src/typeorm/entities/Transport';
import { Vehicule } from 'src/typeorm/entities/Vehicule';
import { 
    CreateDriverParams, 
    CreateTansportParams, 
    CreateVehiculeParams, 
    UpdateTansportParams, 
    UpdateVehiculeParams 
} from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class TransportsService {

    constructor (
        @InjectRepository(Transport) private transportRepository: Repository<Transport>,
        @InjectRepository(Vehicule) private vehiclesRepository: Repository<Vehicule>,
        @InjectRepository(Driver) private driverRepository: Repository<Driver>
    ){}

    findTransports(){
       return this.transportRepository.find({ relations: ['vehicules', 'transports','drivers'] });
    }

    createTransport(transportDetails: CreateTansportParams){
        const newTransport = this.transportRepository.create({ 
            ...transportDetails,
            date_depart: new Date(),
            
        });

        return this.transportRepository.save(newTransport); 
    }

    updateTransportById(id: number , updateTransportDetails: UpdateTansportParams){
        return this.transportRepository.update({ id }, {...updateTransportDetails})
    }

    deleteTransport(id: number) {
        return this.transportRepository.delete({id});
    }

    async createVehicle(
        id:number,
        createVehicleDetails: CreateVehiculeParams
    ){

        const transport = await this.transportRepository.findOneBy({ id })


            if(!transport)
            throw new HttpException(
                'Transport no found. cannot create transport',
                HttpStatus.BAD_REQUEST,
            );
        if(transport){
            const newVehicle = this.vehiclesRepository.create(createVehicleDetails);
            const savedVehicule = await this.vehiclesRepository.save(newVehicle)
            // await this.transportRepository.delete({id:transport.id})
            transport.vehicule = savedVehicule
        
            return this.transportRepository.save(transport)
        }
        
    }

    // async createVehicles(
    //     id:number,
    //     createVehicleDetails: CreateVehiculeParams
    // ){

    //     const driver = await this.driverRepository.findOneBy({ id })

    //     if(!driver)
    //         throw new HttpException(
    //             'Driver no found. cannot create Driver',
    //             HttpStatus.BAD_REQUEST,
    //         );

    //     if(driver){
            
    //         const driverVehicule =  this.vehiclesRepository.create(createVehicleDetails);
    //         const savedDriver = await this.vehiclesRepository.save(driverVehicule)
    //         driver.vehicule = savedDriver
    //         return this.driverRepository.save(driver)

    //     }
        
    // }

    async updateVehiculeById(
        id:number, 
        updateVehiculeDetails: UpdateVehiculeParams,
        ){
        
        return this.vehiclesRepository.update({id} , {... updateVehiculeDetails})
    }

    async deleteVehiculeById(id: number){
        return this.vehiclesRepository.delete({id});
    }

    async createDriver(
        id:number,
        createDriverDetails: CreateDriverParams
    ){
        const vehicule = this.vehiclesRepository.findOneBy({id})
        const newDriver =  this.driverRepository.create(createDriverDetails)
        newDriver.vehiculeId = (await vehicule).id
        return this.driverRepository.save(newDriver)
    }

    async updateDriver(
        id:number,
        createDriverDetails: CreateDriverParams
    ){
        return this.driverRepository.update({id},{... createDriverDetails})
    }

    async updateDriverVehicule(
        idv:number,
        id:number,
        createDriverDetails: CreateDriverParams
    ){
        const Veh = await this.vehiclesRepository.findOneBy({id})
        const driverV = await this.driverRepository.findOneBy({id})
        // const upadteDriver = this.driverRepository.preload(createDriverDetails) 
        // ;(await upadteDriver).vehiculeId = idv

        console.log(driverV);
        
        // return this.driverRepository.save(createDriverDetails)
    }

    async deleteDriver(id: number){
        return this.driverRepository.delete({id});
    }    
}
