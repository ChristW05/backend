import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
    date_depart : string;

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

    @ManyToOne(() => Vehicule, (vehicule) => vehicule.transports)
    vehicule: Vehicule;
}