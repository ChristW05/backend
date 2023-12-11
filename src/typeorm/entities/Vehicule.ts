import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VoitureImage } from "./VoitureImage";
import { Compagnie } from "./Compagnie";
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

    @Column()
    photo:string;

    @ManyToOne(() => Compagnie, (compagnie) => compagnie.vehicules)
    compagnie: Compagnie;

    // @OneToMany(() => VoitureImage, (image) => image.vehicule)
    // images: VoitureImage[];

    @OneToMany(() => Transport, (transport) => transport.vehicule)
    transports: Transport[];

}
