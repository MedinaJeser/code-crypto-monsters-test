import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { CreateBattleDto } from './dto/create-battle.dto';

@Controller('battles')
export class BattlesController {

    constructor(
        private readonly battlesService: BattlesService
    ) {}

    @Post()
    createBattle(@Body() createBattleDto: CreateBattleDto) {
        return this.battlesService.createBattle(createBattleDto);
    }

    @Get()
    findAll() {
        return this.battlesService.findAllBattles();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.battlesService.findBattleById(id);
    }

    @Delete(':id')
    deleteBattle(@Param('id') id: string) {
        return this.battlesService.deleteBattle(id);
    }
    

}
