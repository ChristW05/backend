import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  telephone: string;
  
  @Column()
  age: number;

  @Column()
  dob: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  confirmPassword:string;

  @Column()
  createAt: string;

  @Column({ nullable: true })
  authStrategy: string;;

  @BeforeInsert()
  async setPassword(password: string){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
  // @BeforeInsert()
  // async setconfirmPassword(confirmPassword: string){
  //   const salt = await bcrypt.genSalt();
  //   this.confirmPassword = await bcrypt.hash(confirmPassword || this.confirmPassword, salt);
  // }

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
