import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compagnie } from 'src/typeorm/entities/Compagnie';
import { createCompagnieParams, updateCompagnieParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class CompagniesService {


    constructor(
        @InjectRepository(Compagnie) private userRepository: Repository<Compagnie>,){}

    findCompagnies(){
        return this.userRepository.find()
    }

    findOneCompagnies(id: number){
        return this.userRepository.findOneBy({ id })
    }

    createCompagnie(compagnieDetails : createCompagnieParams){
        const newCompagnie = this.userRepository.create(compagnieDetails);
        return this.userRepository.save(newCompagnie);
    }

    updateCompagnie(id: number, updateCompagnieDetails: updateCompagnieParams){
       return this.userRepository.update({ id }, { ...updateCompagnieDetails})
    }

    deleteCompagnie(id: number){
        return this.userRepository.delete({ id })
    }
}
