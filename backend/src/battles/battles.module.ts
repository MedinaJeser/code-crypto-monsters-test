import { Module } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { BattlesController } from './battles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Battle, BattleSchema } from './battle.schema';
import { MonstersModule } from 'src/monsters/monsters.module';

@Module({
  imports: [
      MongooseModule.forFeature([
        {name: Battle.name, schema: BattleSchema}
      ]),
      MonstersModule,
    ],
  providers: [BattlesService],
  controllers: [BattlesController]
})
export class BattlesModule {}
