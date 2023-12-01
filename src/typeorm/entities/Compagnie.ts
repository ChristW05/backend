import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"
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
}