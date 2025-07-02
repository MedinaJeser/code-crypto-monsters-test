import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { Monster, MonsterSchema } from './monster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Monster.name, schema: MonsterSchema}
    ])
  ],
  providers: [MonstersService],
  controllers: [MonstersController],
  exports: [MonstersService, MongooseModule],
})
export class MonstersModule {}
