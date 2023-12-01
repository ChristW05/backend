import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicule } from "./Vehicule";
import { Post } from "./Post";

@Entity({name : 'transport'})
export class Transport{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    origine: string;

    @Column()
    destination: string;

    @Column()
    date_depart : Date;

    @Column()
    date_arrived: Date;

    @Column()
    heure_depart: Date;

    @Column()
    poids_disponibles: number;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    companyId:number;

    @Column()
    vehiculeId:number;
}