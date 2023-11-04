import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Get,
} from '@nestjs/common';
import { CreateEscaleDto } from 'src/users/dtos/CreateEscale.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { CreateVilleDto } from 'src/users/dtos/CreateVille.dto';
import { UpdateEscaleDto } from 'src/users/dtos/UpdateEscale.dto';
import { UpdateReservationDto } from 'src/users/dtos/UpdateResevation.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UpdateVilleDto } from 'src/users/dtos/UpdateVille.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  //malaka source avy am DB
  @Get()
  getUsers() {
    return this.userService.findUsers();
  }
  @Get('/escales')
  getEscales(){
    return this.userService.findEscales
  }
  // @Get('liste')
  // getUsers(): Promise<
  //   import('f:/Christin/test-nest-app/typeorm-mysql-nestjs/auth-nest/src/typeorm/entities/User').User[]
  // > {
  //   return this.userService.findUsers();
  // }
  // **********************************************************************************************************
  //miposte donnees any am DB
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {

    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }

//   @Post('login')
//   async login (
//     id : number,
//     password: string 
//   ) {
//     const user = await this.userService.findOne({ id });

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
  // @Post()
  // createUser(
  //   @Body() createUserDto: createUseDto,
  // ): Promise<
  //   import('f:/Christin/test-nest-app/typeorm-mysql-nestjs/auth-nest/src/typeorm/entities/User').User
  // > {
  //    this.userService.createUser(createUserDto);
  // }

  //mise a jour user DB
  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto);
    
    await this.userService.updateUser(id, updateUserDto);
  }
  // @Put(':id')
  // async updateUserById(
  //   @Param('id') ParseIntPipe): any id:number {
  //    await this.userService.updateUser();
  // }
  // @Put(':id')
  // async update(@Param('id') id: string): Promise<string> {
  //   return `#${id}`;
  // }

  // mamafa user
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `#${id}`;
  // }

  // create user profile in the db
  // @Post(':id/profiles')
  // createUserProfile(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() createUserProfileDto: CreateUserProfileDto,
  // ) {
  //   return this.userService.createUserProfile({
  //     _id: id,
  //     createUserProfileDetails: createUserProfileDto,
  //   });
  // }
  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }
  
  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
   @Patch('/posts/:id')
  async updateReservationById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    console.log(updateReservationDto);
    
    await this.userService.updateUserPost(id, updateReservationDto);
  }
  @Delete('posts/:id')
  async deleteReservationById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUserPost(id);
  }

  @Post('/escales')
  async createEscale(@Body() createEscaleDto: CreateEscaleDto) {

    console.log(createEscaleDto);
    return this.userService.createEscale(createEscaleDto);
  }
  @Patch('/escales/:id')
  async updateEscaleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEscaleDto: UpdateEscaleDto,
  ) {
    console.log(updateEscaleDto);
    
    await this.userService.updateEscale(id, updateEscaleDto);
  }
  @Delete('/escales/:id')
  async deleteEscaleById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteEscale(id);
  }

  @Post('/escales/:id/villes')
  createEscaleVille(
    @Param('id', ParseIntPipe) id: number,
    @Body() createEscaleVilleDto: CreateVilleDto) {
    console.log(createEscaleVilleDto);
    return this.userService.createEscaleVille(id, createEscaleVilleDto);
  }
  @Patch('/villes/:id')
  async updateVilleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVilleDto: UpdateVilleDto,
  ) {
    console.log(updateVilleDto);
    
    await this.userService.updateVille(id, updateVilleDto);
  }
  @Delete('/villes/:id')
  async deleteVilleById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteVille(id);
  }
}
