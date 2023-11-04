import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transport } from "./Transport";


@Entity({ name: 'vehicules' })
export class Vehicule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    matricule: string;

    @Column()
    couleur: string;

    @Column()
    type:string

    @Column()
    marque:string

}
