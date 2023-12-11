import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { LogoCooperative } from './LogoCooperative';
import { VoitureImage } from "./VoitureImage";
import { Vehicule } from "./Vehicule";
@Entity({ name : 'compagnies'})
export class Compagnie{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    siege: string;
    
    @Column()
    lieu_exercice: string;

    @Column()
    nif: string;
    
    @Column()
    stat: string;

    @Column()
    contact: string;
    
    @Column()
    description: string;

    // @OneToMany(() => LogoCooperative, (logo) => logo.compagnie)
    // logos: LogoCooperative[];

    // @OneToMany(() => VoitureImage, (image) => image.compagnie)
    // images: VoitureImage[];

    @OneToMany(() => Vehicule, (vehicule) => vehicule.compagnie)
    vehicules: Vehicule[];
}