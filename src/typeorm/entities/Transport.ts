import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicule } from "./Vehicule";

@Entity({name : 'transport'})
export class Transport{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    origine: string

    @Column()
    date_depart : Date

    @Column()
    date_arrived: Date

    @Column()
    prix: number

    @Column()
    description: string

    @Column()
    type: string


   @OneToOne(()=>Vehicule,{eager:true,cascade:true,onDelete:'CASCADE'} )
   @JoinColumn()
   vehicule : Vehicule;

}