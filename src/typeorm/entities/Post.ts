import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

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
  prix_a_payer_Ar: number;

  @Column()
  createAt: Date;

  @Column()
  titre: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
