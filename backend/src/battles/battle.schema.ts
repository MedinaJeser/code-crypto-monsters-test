import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BattleDocument = Battle & Document;

@Schema()
export class BattleTurn {
    @Prop({ type: Types.ObjectId, ref: 'Monster', required: true })
    attacker: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Monster', required: true })
    defender: Types.ObjectId;

    @Prop({ required: true })
    turnNumber: number;

    @Prop({ required: true })
    damage: number;

    @Prop({ required: true })
    remainingHealthDefender: number;
}

const BattleTurnSchema = SchemaFactory.createForClass(BattleTurn);

@Schema()
export class Battle {
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Monster' }], required: true })
    monsters: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Monster' })
    winner: Types.ObjectId;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: [BattleTurnSchema], default: [] })
    battleTurns: BattleTurn[];
}

export const BattleSchema = SchemaFactory.createForClass(Battle);
