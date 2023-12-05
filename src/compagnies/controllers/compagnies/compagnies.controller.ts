import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { createCompagnieDto } from 'src/compagnies/dots/CreateCompagnie.dto';
import { updateCompagnieDto } from 'src/compagnies/dots/UpdateCompagnie.dto';
import { CompagniesService } from 'src/compagnies/services/compagnies/compagnies.service';

@Controller('compagnies')
export class CompagniesController {

    constructor(private userService : CompagniesService){}

    @Get()
    async getCompagnies(){
        const compagnies = await this.userService.findCompagnies();
        return compagnies
    }

    @Post()
    createCompagnie(@Body() createCompagnieDto: createCompagnieDto){
        this.userService.createCompagnie(createCompagnieDto)    
    }
    
    @Get(':id')
    async getOneCompagnie(@Param('id', ParseIntPipe) id: number){
        const oneCompagnie = await this.userService.findOneCompagnies(id);
        return oneCompagnie
    }

    @Patch(':id')
    async updateCompagnieById(@Param('id', ParseIntPipe) id: number,
    @Body() updateCompagnieDto:updateCompagnieDto,
    ) {
        await this.userService.updateCompagnie(id, updateCompagnieDto)
    }

    @Delete(':id')
    async deleteCompagnieById(@Param('id', ParseIntPipe) id: number) {
        await this.userService.deleteCompagnie(id)
    }
}
