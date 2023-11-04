import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import {
  CreateEscaleParams,
  CreateUserParams,
  CreateUserProfileParams,
  CreateVilleParams,
  UpdateEscaleParams,
  UpdateReservationParams,
  UpdateUserParams,
  UpdateVilleParams,
} from 'src/utils/type';
import { Profile } from 'src/typeorm/entities/Profile';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { Post } from 'src/typeorm/entities/Post';
import { Escale } from 'src/typeorm/entities/Escale';
import { Ville } from 'src/typeorm/entities/Ville';
import { UpdateReservationDto } from 'src/users/dtos/UpdateResevation.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Escale) private escaleRepository: Repository<Escale>,
    @InjectRepository(Ville) private villeRepository: Repository<Ville>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts']});
  }

  findEscales() {
    return this.escaleRepository.find({ relations: ['ville']});
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createAt: new Date().toLocaleDateString(),
    });
    return this.userRepository.save(newUser);
  }
  //   createUser({
  //     userDetails,
  //   }: {
  //     userDetails: CreateUserParams;
  //   }): Promise<User> {
  //     const newUser = this.userRepository.create({
  //       ...userDetails,
  //       createAt: new Date(),
  //     });
  //     return this.userRepository.save(newUser);
  //   }

  updateUser(
    id: number, 
    updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails, createAt: new Date().toLocaleDateString()});
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'Utilisateur introuvable ou peut être pas encore créer',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }
   
  // async login (
  //     id : number, 
  //     password: string 
  //   ) {
  //     const user = await this.userRepository.findOneBy({ id });

  //     if(!user){
  //       throw new HttpException(
  //         'Utilisateur introuvable ou peut être pas encore créer',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     if(!await compare(password, user.password)){
  //       throw new HttpException(
  //         'Utilisateur introuvable ou peut être pas encore créer',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //   console.log(user);
  //   return user;
  // }

  async createUserPost(
    id: number, 
    createUserPostDetails: CreateUserPostDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'Utilisateur introuvable ou peut être pas encore créer',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newPost);
  }
  updateUserPost(
    id: number, 
    updateReservationDetails: UpdateReservationParams) {
    return this.postRepository.update({ id }, { ...updateReservationDetails });
  }
  deleteUserPost(id: number) {
    return this.postRepository.delete(id);
  }

  createEscale(escaleDetails: CreateEscaleParams) {
    const date = new Date();
    console.log(date);
    console.log(date.toLocaleDateString());
    // const heure = date.toLocaleTimeString();
    // console.log(heure);
    const newEscale = this.escaleRepository.create({
      ...escaleDetails,
      createAt: date.toLocaleDateString(),
    });
    console.log(newEscale);
    return this.escaleRepository.save(newEscale);
  }
  updateEscale(
    id: number, 
    updateEscaleDetails: UpdateEscaleParams) {
    return this.escaleRepository.update({ id }, { ...updateEscaleDetails, createAt: new Date().toLocaleDateString() });
  }
  deleteEscale(id: number) {
    return this.escaleRepository.delete(id);
  }

  async createEscaleVille(
    id: number,
    createEscaleVilleDetails: CreateVilleParams,
  ) {
    const escale = await this.escaleRepository.findOneBy({ id });
    if (!escale)
      throw new HttpException(
        'Escale introuvable ou peut être pas encore créer',
        HttpStatus.BAD_REQUEST,
      );
    const newVille = this.villeRepository.create(createEscaleVilleDetails);
    const saveVille = await this.villeRepository.save(newVille);
    escale.ville = saveVille;
    return this.escaleRepository.save(escale);
  }
  updateVille(
    id: number, 
    updateVilleDetails: UpdateVilleParams) {
    return this.villeRepository.update({ id }, { ...updateVilleDetails });
  }
  deleteVille(id: number) {
    return this.villeRepository.delete(id);
  }
}
