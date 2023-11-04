import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicule } from "./Vehicule";

@Entity({name: 'drivers'})
export class Driver {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    permis_categories:string

    // @OneToOne(()=>Vehicule)
    // @JoinColumn()
    // vehicule : Vehicule;
    @Column()
    vehiculeId:number
}