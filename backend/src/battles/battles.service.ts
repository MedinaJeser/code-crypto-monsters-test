import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBattleDto } from './dto/create-battle.dto';
import { MonsterDocument } from 'src/monsters/monster.schema';
import { Model, Types } from 'mongoose';
import { BattleDocument } from './battle.schema';

@Injectable()
export class BattlesService {
    constructor(
        @InjectModel('Battle') private readonly battleModel: Model<BattleDocument>,
        @InjectModel('Monster') private readonly monsterModel: Model<MonsterDocument>,
    ) { }

    async createBattle(createBattleDto: CreateBattleDto) {
        const ids = createBattleDto.monsters.map(id => new Types.ObjectId(id));

        const monsters = await this.monsterModel.find({ _id: { $in: ids } }).lean();

        if (monsters.length !== createBattleDto.monsters.length) {
            throw new Error('Some monsters not found');
        }

        const monstersStatus = monsters.map(monster => ({ ...monster, currentHealth: monster.hp }));

        let battleTurns: object[] = []
        let turnNumber = 1;

        while (monstersStatus.filter(monster => monster.currentHealth > 0).length > 1) {
            const monstersAlive = monstersStatus.filter(monster => monster.currentHealth > 0);

            const turnOrder = [...monstersAlive].sort((a, b) => {
                if (b.speed === a.speed) return b.attack - a.attack;
                return b.speed - a.speed;
            });

            for (const attacker of turnOrder) {
                if (attacker.currentHealth <= 0) continue;

                const defender = turnOrder.find(m => m._id.toString() !== attacker._id.toString() && m.currentHealth > 0);

                if (!defender) {
                    break;
                }

                let damage = attacker.attack - defender.defense;
                if (damage <= 0) damage = 1;

                defender.currentHealth -= damage;
                if (defender.currentHealth < 0) defender.currentHealth = 0;

                battleTurns.push({
                    attacker: attacker._id,
                    defender: defender._id,
                    turnNumber,
                    damage,
                    remainingHealthDefender: defender.currentHealth,
                });

                if (monstersStatus.filter(m => m.currentHealth > 0).length === 1) {
                    break;
                }

                turnNumber++;
            }
        }

        const winner = monstersStatus.find(m => m.currentHealth > 0);

        const battle = new this.battleModel({
            monsters: ids,
            winner: winner ? winner._id : null,
            battleTurns,
        });

        return battle.save();
    }

    async findAllBattles() {
        const battles = await this.battleModel.find()
            .select('-battleTurns')
            .populate('monsters')
            .populate('winner')
            .lean();

        return battles;
    }

    async findBattleById(id: string) {
        const battle = await this.battleModel.findById(id)
            .populate('monsters')
            .populate('winner')
            .populate('battleTurns.attacker')
            .populate('battleTurns.defender')
            .lean();

        if (!battle) {
            throw new Error('Battle not found');
        }

        return battle;
    }

    async deleteBattle(id: string) {
        const battle = await this.battleModel.findByIdAndDelete(id);
        if (!battle) {
            throw new Error('Battle not found');
        }
        return battle;
    }
}
