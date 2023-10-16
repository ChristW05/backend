import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/utils/type';
import { Profile } from 'src/typeorm/entities/Profile';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {
  find() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts']});
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createAt: new Date(),
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
    return this.userRepository.update({ id }, { ...updateUserDetails });
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
}
