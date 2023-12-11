import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Compagnie } from "./Compagnie";


@Entity({name: 'cooperative_logo'})
export class LogoCooperative{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    photo: string;

    @Column()
    createAt: Date;

    // @ManyToOne(() => Compagnie, (compagnie) => compagnie.logos)
    // compagnie: Compagnie;
}