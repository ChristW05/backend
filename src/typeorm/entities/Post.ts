import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Transport } from './Transport';

@Entity({ name: 'user_posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destinataire: string;
  
  @Column()
  point_de_recuperation: string;
    
  @Column()
  point_dArriver: string;
  
  @Column()
  Lat_Depart: number;
  
  @Column()
  Lat_dArriver: number;

  @Column()
  Poids_Colis_Kg: number;

  @Column()
  Distance_Km: number;
  
  @Column()
  prix_a_payer_Ar: number;

  @Column()
  createAt: Date;

  @Column()
  typeColis: string;

  @Column()
  description: string;

  @Column()
  transportId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column()
  Status:string;
}
