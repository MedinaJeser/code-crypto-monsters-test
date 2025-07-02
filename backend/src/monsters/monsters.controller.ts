import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { Monster } from './monster.schema';

@Controller('monsters')
export class MonstersController {

    constructor(private readonly monstersService: MonstersService){}

    @Post()
    create(@Body() monsterData: Partial<Monster>){
        return this.monstersService.create(monsterData);
    }

    @Get()
    findAll() {
        return this.monstersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.monstersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() monsterData: Partial<Monster>) {
        return this.monstersService.update(id, monsterData);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.monstersService.delete(id);
    }
}
