import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';

  @Entity({ name: 'reservations' })
  export class Reservation {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column()
    destinataire: string;
  
    @Column()
    point_de_recuperation: string;
    
    @Column()
    point_dArriver: string;
    
    @Column()
    prix_a_payer_Ar: number;

    @Column()
    createAt: Date;

}