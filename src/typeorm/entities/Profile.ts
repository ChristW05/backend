import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  telephone: number;

  @Column()
  email: string;

  @Column()
  confrimPassword:string;

  @Column()
  age: number;

  @Column()
  dob: string;
}
