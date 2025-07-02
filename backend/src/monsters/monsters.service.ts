import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Monster, MonsterDocument } from './monster.schema';
import { Model } from 'mongoose';

@Injectable()
export class MonstersService {

    constructor(
        @InjectModel('Monster') private readonly monsterModel: Model<MonsterDocument>,
    ) { }

    async create(monsterData: Partial<Monster>) {
        const createdMonster = new this.monsterModel(monsterData);
        return createdMonster.save();
    }

    async findAll() {
        const monstersEnabled = await this.monsterModel.find({ isEnabled: true }).exec();
        return monstersEnabled;        
    }

    async findOne(id: string) {
        return this.monsterModel.findById(id).exec();
    }

    async update(id: string, monsterData: Partial<Monster>) {
        return this.monsterModel.findByIdAndUpdate(id, monsterData, { new: true }).exec();
    }

    async delete(id: string) {
        return this.monsterModel.findByIdAndUpdate(id, { isEnabled: false }, { new: true }).exec();
    }

}
