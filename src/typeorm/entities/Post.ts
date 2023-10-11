/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}