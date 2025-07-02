import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MonsterDocument = Monster & Document;

@Schema()
export class Monster {
    @Prop({ required: true })
    name: string;

    @Prop()
    hp: number;

    @Prop()
    attack: number;

    @Prop()
    defense: number;

    @Prop()
    speed: number;

    @Prop()
    imageUrl: string;

    @Prop({ default: true })
    isEnabled: boolean;
}

export const MonsterSchema = SchemaFactory.createForClass(Monster);
