import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Compagnie } from "./Compagnie";
// import { Vehicule } from "./Vehicule";


@Entity({name: 'voiture_image'})
export class VoitureImage{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    photo: string;

    // @ManyToOne(() => Compagnie, (compagnie) => compagnie.images)
    // compagnie: Compagnie;

    // @ManyToOne(() => Vehicule, (vehicule) => vehicule.images)
    // vehicule: Vehicule;
}