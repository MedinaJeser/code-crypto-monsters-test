import { IsArray, ArrayMinSize, IsMongoId } from 'class-validator';

export class CreateBattleDto {
  @IsArray()
  @ArrayMinSize(2)
  @IsMongoId({ each: true })
  monsters: string[];
}