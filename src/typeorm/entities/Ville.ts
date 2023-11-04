import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity({name:'villes'})
export class Ville {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Nom_ville: string;
    
    @Column()
    Lieu: string;

    @Column()
    Code_postal: number;

    @Column()
    Latitude: string;

    @Column()
    Longitude: string;
}