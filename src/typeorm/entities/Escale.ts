import { 
    Column, 
    Entity, 
    JoinColumn, 
    OneToOne, 
    PrimaryGeneratedColumn 
} 
from "typeorm";
import { Ville } from "./Ville";

@Entity({name:'escales'})
export class Escale {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    createAt: string;
    
    @Column()
    HeureDepart: string;

    @Column()
    HeureArriver: string;

    @Column()
    transportId:number;

    @OneToOne(() => Ville,
    { eager:true, cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    ville: Ville;

    
}