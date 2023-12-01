import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProjetService } from './projet.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { UpdateReservationDto } from 'src/users/dtos/UpdateResevation.dto';
import { CreateEscaleDto } from 'src/users/dtos/CreateEscale.dto';
import { UpdateEscaleDto } from 'src/users/dtos/UpdateEscale.dto';
import { CreateVilleDto } from 'src/users/dtos/CreateVille.dto';
import { UpdateVilleDto } from 'src/users/dtos/UpdateVille.dto';
import { createCompagnieDto } from 'src/compagnies/dots/CreateCompagnie.dto';
import { updateCompagnieDto } from 'src/compagnies/dots/UpdateCompagnie.dto';
import { CreateTransportDto } from 'src/transports/dtos/CreateTransportDto';
import { UpdateTransportDto } from 'src/transports/dtos/UpdateTransportDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateVehiculeDto } from 'src/transports/dtos/CreateVehiculeDto';
import { UpdateVehiculeDto } from 'src/transports/dtos/UpdateVehiculeDto';
import { CreateDriverDto } from 'src/transports/dtos/CreateDriverDto';
import { SETTING } from 'src/app.utils';
import { User } from 'src/typeorm/entities/User';

@Controller('projet')
export class ProjetController {
    constructor(
        private projetService : ProjetService        
    )
    {}

    @Post('/users')
    async createUser(
      @Body() 
      createUserDto: CreateUserDto
      ){
        console.log(createUserDto);
      return await this.projetService.createUser(createUserDto);
    }

    @Get('/users')
    getUsers() {
      return this.projetService.findUsers();
    }
    @Get('/escales')
    getEscales(){
      return this.projetService.findEscales()
    }
  
    @Patch('/users/:id')
    async updateUserById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      console.log(updateUserDto);
      
      await this.projetService.updateUser(id, updateUserDto);
    }
    @Delete('/users/:id')
    async deleteUserById(@Param('id', ParseIntPipe) id: number) {
      await this.projetService.deleteUser(id);
    }
    
    @Post('/user/:id/posts')
    createUserPost(
      @Param('id', ParseIntPipe) id: number,
      @Body() createUserPostDto: CreateUserPostDto,
    ) {
      return this.projetService.createUserPost(id, createUserPostDto);
    }
     @Patch('/posts/:id')
      async updateReservationById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateReservationDto: UpdateReservationDto,
    ) {
      console.log(updateReservationDto);
      
      await this.projetService.updateUserPost(id, updateReservationDto);
    }
    @Delete('/posts/:id')
    async deleteReservationById(@Param('id', ParseIntPipe) id: number) {
      await this.projetService.deleteUserPost(id);
    }
  
    @Post('/escales')
    async createEscale(@Body() createEscaleDto: CreateEscaleDto) {
  
      console.log(createEscaleDto);
      return this.projetService.createEscale(createEscaleDto);
    }
    @Patch('/escales/:id')
    async updateEscaleById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateEscaleDto: UpdateEscaleDto,
    ) {
      console.log(updateEscaleDto);
      
      await this.projetService.updateEscale(id, updateEscaleDto);
    }
    @Delete('/escales/:id')
    async deleteEscaleById(@Param('id', ParseIntPipe) id: number) {
      await this.projetService.deleteEscale(id);
    }
  
    @Post('/escales/:id/villes')
    createEscaleVille(
      @Param('id', ParseIntPipe) id: number,
      @Body() createEscaleVilleDto: CreateVilleDto) {
      console.log(createEscaleVilleDto);
      return this.projetService.createEscaleVille(id, createEscaleVilleDto);
    }
    @Patch('/villes/:id')
    async updateVilleById(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateVilleDto: UpdateVilleDto,
    ) {
      console.log(updateVilleDto);
      
      await this.projetService.updateVille(id, updateVilleDto);
    }
    @Delete('/villes/:id')
    async deleteVilleById(@Param('id', ParseIntPipe) id: number) {
      await this.projetService.deleteVille(id);
    }


    
    @Get('/company')
    async getCompagnies(){
        const compagnies = await this.projetService.findCompagnies();
        return compagnies
    }

    @Post('/company')
    createCompagnie(@Body() createCompagnieDto: createCompagnieDto){
        this.projetService.createCompagnie(createCompagnieDto)    
    }
    
    @Get('/company/:id')
    async getOneCompagnie(@Param('id', ParseIntPipe) id: number){
        const oneCompagnie = await this.projetService.findOneCompagnies(id);
        return oneCompagnie
    }

    @Patch('/company/:id')
    async updateCompagnieById(@Param('id', ParseIntPipe) id: number,
    @Body() updateCompagnieDto:updateCompagnieDto,
    ) {
        await this.projetService.updateCompagnie(id, updateCompagnieDto)
    }

    @Delete('/company/:id')
    async deleteCompagnieById(@Param('id', ParseIntPipe) id: number) {
        await this.projetService.deleteCompagnie(id)
    }

    @Get('/transport')
    getTransports(){
        return  this.projetService.findTransports();
    }

    @Post('/company/:id/vehicule/:idv/transport')
    createTransport(
        @Param('id', ParseIntPipe) id: number,
        @Param('idv', ParseIntPipe) idv: number,
        @Body() createTransportDto: CreateTransportDto
        ){
        return this.projetService.createTransport(id,idv, createTransportDto);
    }

    @Get('/transport/:id')
    async findTransportById(
        @Param('id', ParseIntPipe) id:number,
        ) {
        return await this.projetService.findOneTransportById(id)
    }

    @Put('/transport/:id')
    async updateTransportById(
        @Param('id', ParseIntPipe) id:number,
        @Body() updtateTransportDto: UpdateTransportDto
        ) {
        await this.projetService.updateTransportById(id, updtateTransportDto)
    }


    @Delete('/transport/:id')
    async deleteTransportById(
        @Param('id', ParseIntPipe) id: number){
            await this.projetService.deleteTransport(id);
        }

    @Post('/vehicules')
    @UseInterceptors(FileInterceptor('photo',{
        storage:diskStorage({
            destination: './files',
            filename: (req, file ,callback) =>{
                const uniqueSuffix = Date.now() +'-'+Math.round(Math.random()*1e9)
                const ext = extname(file.originalname);
                const fileName = `${uniqueSuffix}${ext}`;
                callback(null,fileName)
            }
        })
    }))
    createVehicle(
        @UploadedFile() file:Express.Multer.File,
        @Body() createVehiclesDto: CreateVehiculeDto,
    ){
        
        // console.log(file);
        

        createVehiclesDto.photo = file.filename
        // console.log(createVehiclesDto);
        
        return this.projetService.createVehicle(createVehiclesDto);
    }
    
    // @Post('/driver/:id/vehicules')
    // createVehicles(
    //     @Param('id' ,ParseIntPipe) id:number,
    //     @Body() createVehiclesDto: CreateVehiculeDto,
    // ){
    //     console.log(createVehiclesDto);
        
    //     return this.projetService.createVehicles(id, createVehiclesDto);
    // }

    @Put('/vehicule/:id')
    async updateVehiculeById(
        @Param('id', ParseIntPipe) id:number,
        @Body() updateVehiculeDto: UpdateVehiculeDto
        ){
        await this.projetService.updateVehiculeById(id, updateVehiculeDto);
    }

    @Delete('/vehicule/:id')
    async deleteVehiculeById(@Param('id', ParseIntPipe) id:number){
        return this.projetService.deleteVehiculeById(id);
    }

    @Post('/vehicule/:id/driver')
    @UseInterceptors(FileInterceptor('photo',{
        storage:diskStorage({
            destination: './files',
            filename: (req, file ,callback) =>{
                const uniqueSuffix = Date.now() +'-'+Math.round(Math.random()*1e9)
                const ext = extname(file.originalname);
                const fileName = `${uniqueSuffix}${ext}`;
                callback(null,fileName)
            }
        })
    }))
    async createDriver(
        @UploadedFile() file:Express.Multer.File,
        @Param('id', ParseIntPipe) id:number,
        @Body() createDriverDetails:CreateDriverDto
        ){
            createDriverDetails.photo= file.filename

            // suprimer image dans un dossier avec le path

            // unlinkSync('files/Capture001.png-1699874859262-607391159.png')

        return this.projetService.createDriver(id, createDriverDetails)
    }



    @Put('/driver/:id')
    async updateDriver(
        @Param('id', ParseIntPipe) id:number,
        @Body() createDriverDetails:CreateDriverDto
        ){
        return this.projetService.updateDriver(id, createDriverDetails)
    }

    @Put('/vehicule/:idv/driver/:id')
    async updateDriverVehicule(
        @Param('id', ParseIntPipe) id:number,
        @Param('idv', ParseIntPipe) idv:number,
        @Body() createDriverDetails:CreateDriverDto
        ){
        return this.projetService.updateDriverVehicule(id,idv, createDriverDetails)
    }

    @Delete('/driver/:id')
    async deleteDriver(@Param('id', ParseIntPipe) id:number){
        return this.projetService.deleteDriver(id);
    }

    // @Post('/vehicule/:id/driver')
    // async createDriv( @Param('id', ParseIntPipe) id:number, @Body() createDriveDetail:CreateDriverDto ){
    //     return this.projetService.createDriver(id,createDriveDetail)
    // }

    @Get('/user')
    async authUser(@Req() req: Request, @Res() resp: Response) {
      
      return this.projetService.authUser(req, resp);
    }

    @Post('/login')
    loginUser(@Body() user: CreateUserDto,@Res() res: Response) {
    return this.projetService.loginUser(user, res);
  }
  @Post('/logout')
  logoutUser(@Res() resp: Response) {
    return this.projetService.logoutUser(resp);
  }

}
