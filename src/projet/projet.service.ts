import { 
  HttpException, 
  HttpStatus, 
  Injectable, 
  Req, 
  Res, 
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request, response } from 'express';
import { Compagnie } from 'src/typeorm/entities/Compagnie';
import { Driver } from 'src/typeorm/entities/Drivers';
import { Escale } from 'src/typeorm/entities/Escale';
import { Post } from 'src/typeorm/entities/Post';
import { Transport } from 'src/typeorm/entities/Transport';
import { User } from 'src/typeorm/entities/User';
import { Vehicule } from 'src/typeorm/entities/Vehicule';
import { Ville } from 'src/typeorm/entities/Ville';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

import { 
  CreateDriverParams, 
  CreateEscaleParams, 
  CreateTansportParams, 
  CreateUserParams,
   CreateVehiculeParams, 
   CreateVilleParams, 
   UpdateEscaleParams, 
   UpdateReservationParams, 
   UpdateTansportParams,
    UpdateUserParams, 
    UpdateVehiculeParams, 
    UpdateVilleParams, 
    createCompagnieParams, 
    updateCompagnieParams 
  } from 'src/utils/type';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProjetService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Escale) private escaleRepository: Repository<Escale>,
        @InjectRepository(Ville) private villeRepository: Repository<Ville>,
        @InjectRepository(Compagnie) private companyRepository: Repository<Compagnie>,
        @InjectRepository(Transport) private transportRepository: Repository<Transport>,
        @InjectRepository(Vehicule) private vehiclesRepository: Repository<Vehicule>,
        @InjectRepository(Driver) private driverRepository: Repository<Driver>,
        @InjectRepository(Compagnie) private compagnieRepository: Repository<Compagnie>,
        private jwtService: JwtService,
        ){}
      
    
      findUsers() {
        return this.userRepository.find({ relations: ['posts']});
      }
    
      findEscales() {
        return this.escaleRepository.find({ relations: ['ville']});
      }

      async authUser(@Req() req: Request, @Res() resp: Response){
        try{
          const cookie = request.cookies['jwt'];
          const data = this.jwtService.verifyAsync(cookie);
          if(!data){
            throw new UnauthorizedException();
          }
          const user = await this.userRepository.findOneBy({id: data['id']});
          const {password,...result} = user;
          return result;
        }catch (error){
          throw new UnauthorizedException();
        }
      }
    
      async createUser(
        userDetails: CreateUserDto,
        ) {
        const { nom, prenom, telephone, age, dob, email, password, confirmPassword } = userDetails;
        const date = new Date();
        // check for required fields
        if (!nom.trim()){
          return response
            .status(500)
            .send({
               message: 'veuillez remplir les champs.' 
              });
        }
        if (!confirmPassword.trim()){
          return response
            .status(500)
            .send({ message: 'veuillez remplir les champs.' });
        }
        try {
          const userDetails = await this.userRepository.save({
            nom, 
            prenom, 
            telephone, 
            age, 
            dob,
            email, 
            password: await bcrypt.hash(password, '$2b$12$5dKccJn3RFDUzeeOhG6LyOpQ2MAHl1hQuTsIP2LnpsWP9s28.Atmu'),
            confirmPassword: await bcrypt.hash(confirmPassword, '$2b$12$5dKccJn3RFDUzeeOhG6LyOpQ2MAHl1hQuTsIP2LnpsWP9s28.Atmu'),
            createAt : date.toLocaleDateString(),
          });
          console.log(userDetails);
          return response.status(200).send(userDetails);
        } catch (error) {
          console.error(error);
    
          if (error instanceof QueryFailedError) {
            //@ts-ignore
            if (error.code === '23505') {
              //@ts-ignore
              console.error(`Unique constraint ${error.constraint} failed`);
              return response
                .status(500)
                .send({ message: 'Utilisateur existe déjà avec email.' });
            }
          }
          return response
          .status(500)
          .send({ message: error });
        }
        
      }
    
      updateUser(
        id: number, 
        updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails, createAt: new Date().toLocaleDateString()});
      }
    
      deleteUser(id: number) {
        return this.userRepository.delete(id);
      }
    
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
        

    findCompagnies(){
        return this.companyRepository.find()
    }

    findOneCompagnies(id: number){
        return this.companyRepository.findOneBy({ id })
    }

    createCompagnie(compagnieDetails : createCompagnieParams){
        const newCompagnie = this.companyRepository.create(compagnieDetails);
        return this.companyRepository.save(newCompagnie);
    }

    updateCompagnie(id: number, updateCompagnieDetails: updateCompagnieParams){
       return this.companyRepository.update({ id }, { ...updateCompagnieDetails})
    }

    deleteCompagnie(id: number){
        return this.companyRepository.delete({ id })
    }



    findTransports(){
        //    return this.transportRepository.find({ relations: ['vehicules', 'transports','drivers'] });
           return this.transportRepository.find();
        }
    
        findOneTransportById(
            id:number
        ){
            return this.transportRepository.findOneBy({id})
        }
    
       async createTransport(
            id:number,
            idv:number,
            transportDetails: CreateTansportParams
            ){    
            const company = await this.compagnieRepository.findOneBy({id})
            const vehicule = await this.vehiclesRepository.findOneBy({id:idv})
            const newTransport = await this.transportRepository.create({
                ...transportDetails,
                date_depart: new Date(),
            })
            newTransport.companyId = (await company).id
            newTransport.vehiculeId = (await vehicule).id
            return this.transportRepository.save(newTransport)
        }
    
        updateTransportById(id: number , updateTransportDetails: UpdateTansportParams){
            return this.transportRepository.update({ id }, {...updateTransportDetails})
        }
    
        async deleteTransport(id: number) {
            
            return this.transportRepository.delete({id});
        }
    
        async createVehicle(
            createVehicleDetails: CreateVehiculeParams
        ){
    
        return this.vehiclesRepository.save(createVehicleDetails)
            
        }
    
        async updateVehiculeById(
            id:number, 
            updateVehiculeDetails: UpdateVehiculeParams,
            ){
            
            return this.vehiclesRepository.update({id} , {... updateVehiculeDetails})
        }
    
        async deleteVehiculeById(id: number){
            const driver = await this.driverRepository.find()
            //  const drivers = driver.find((obj)=>{obj.vehiculeId == id})
            // vehiculeId = await this.driverRepository.findOneBy()
            for(let i = 0;i < driver.length ; i ++){
                if(driver[i].vehiculeId == id){
                    await this.driverRepository.preload({vehiculeId:0})
                }
            }
            // console.log(driver[0].vehiculeId)
            return this.vehiclesRepository.delete({id});
        }
    
        async createDriver(
            id:number,
            createDriverDetails: CreateDriverParams
        ){
            const vehicule = this.vehiclesRepository.findOneBy({id})
            const newDriver =  this.driverRepository.create(createDriverDetails)
            newDriver.vehiculeId = (await vehicule).id
            return this.driverRepository.save(newDriver)
        }
    
        async updateDriver(
            id:number,
            createDriverDetails: CreateDriverParams
        ){
            return this.driverRepository.update({id},{... createDriverDetails})
        }
    
        async updateDriverVehicule(
            idv:number,
            id:number,
            createDriverDetails: CreateDriverParams
        ){
            const Veh = await this.vehiclesRepository.findOneBy({id})
            const driverV = await this.driverRepository.findOneBy({id})
            // const upadteDriver = this.driverRepository.preload(createDriverDetails) 
            // ;(await upadteDriver).vehiculeId = idv
    
            console.log(driverV);
            
            // return this.driverRepository.save(createDriverDetails)
        }
    
        async deleteDriver(id: number){
            return this.driverRepository.delete({id});
        }    



        // LOGIN USER
    async loginUser(
      user: CreateUserParams,
      // @Res({passthrough: true})
      resp : Response,
      ) {
      const { email, password } = user;
  
      // check for required fields
      if (!email?.trim() || !password?.trim()) {
        return response
          .status(500)
          .send({ message: 'Veuillez remplir les champs.' });
      }
  
      const userDB =  await this.userRepository.findOne({ where: { email } });
  
      // user not found or wrong password
      const pass = await bcrypt.hash(user.password, '$2b$12$5dKccJn3RFDUzeeOhG6LyOpQ2MAHl1hQuTsIP2LnpsWP9s28.Atmu');
      if (!userDB) {
        return response.status(500).send({ message: 'Invalide Credentials.' });
      }else if(pass == userDB.password){
        console.log(pass);
        console.log(userDB.password);

          const id = userDB.id;
          // const jwt = await this.jwtService.signAsync({ id: userDB.id });
          // const jwt = await this.jwtService.sign([id]);
          // console.log(jwt);
          console.log("Connexion avec succès.");
          console.log(id);
          console.log(userDB);

          // return ;
          // response.cookie('jwt', jwt,{ httpOnly:true });
          // return {
          //   message: 'verifier votre mot de passe '
          // };
        }else{
          console.log("verifier votre mot de passe.")
        }
        return;
      }
      // console.log(userDB);
      // const pass = await bcrypt.hash(user.password, '$2b$12$5dKccJn3RFDUzeeOhG6LyOpQ2MAHl1hQuTsIP2LnpsWP9s28.Atmu');

      // if (!(await bcrypt.compare(pass, userDB.password))) {
      //   return response.status(500).send({ message: 'Invalide password Credentials.' });
      // }

        async logoutUser(@Res({passthrough: true}) resp: Response) {
          response.cookie('accessToken', '', { maxAge: 0 });
          response.cookie('refreshToken', '', { maxAge: 0 });
          // response.clearCookie('jwt');
      
          return { 
            message: 'Deconnexion avec succès.' 
          };
        }
    
}
