import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { ShelvesService } from '../shelves/shelves.service';
import { Shelf } from '../shelves/schemas/shelf.schemas';
import { RemovedFlowers } from './schemas/removedFlowers.schemas';
import { User } from '../users/schemas/user.schema';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { EditFlowerDto } from './dto/edit-flower.dto';
import { FlowerData, Flower } from './interfaces';

@Injectable()
export class FlowersService {
  private logger = new Logger('ShelvesService');
  constructor(
    private readonly shelvesService: ShelvesService,
    @InjectModel(Shelf.name) private readonly shelveModel: Model<Shelf>,
    @InjectModel(RemovedFlowers.name) private readonly removedFlowersModel: Model<RemovedFlowers>,
  ) {}

  async createFlower(createFlowerDto:CreateFlowerDto, user: User): Promise<any> {
    const { shelfId } = createFlowerDto;
    const foundShelf = await this.shelvesService.getShelfById(shelfId, user);

    let { name, description, hydrationRule, wateringRule, nextWateringAt } = createFlowerDto;

    const newFlower = {
      name,
      description,
      hydrationRule,
      wateringRule,
      createdAt: new Date(),
      nextWateringAt: new Date(nextWateringAt),
      id: uuidv4()
    };

    foundShelf.flowers.push(newFlower);

    foundShelf.save();

    return newFlower;
  }

  async updateFlower(editFlowerDto: EditFlowerDto, user: User): Promise<any> {
    const { shelfId } = editFlowerDto;
    let foundShelf = await this.shelvesService.getShelfById(shelfId, user);
    let { id, name, hydrationRule, wateringRule, nextWateringAt, description } = editFlowerDto;
    const flowerIndex = foundShelf.flowers.findIndex(f => f.id === id);

    if (flowerIndex === -1) {
      throw new NotFoundException(`Flower with ID "${id}" not found`);
    }

    const updatedFlower = {
      ...foundShelf.flowers[flowerIndex],
      name,
      description,
      hydrationRule,
      wateringRule,
      nextWateringAt: new Date(nextWateringAt)
    };

    foundShelf.flowers[flowerIndex] = updatedFlower;

    foundShelf = await this.shelveModel.findByIdAndUpdate(shelfId, { flowers: foundShelf.flowers }, { new: true });

    return foundShelf.flowers[flowerIndex];
  }

  async waterFlower(shelfId, flowerId, user): Promise<any> {
    let updated = null;
    const shelfToUpdate = await this.shelvesService.getShelfById(shelfId, user);
    const updatedFlowersToSave = shelfToUpdate.flowers.map(flower => {
      if (flower.id !== flowerId) {
        return flower;
      }
      const nextWateringAt = new Date();
      nextWateringAt.setDate(nextWateringAt.getDate() + flower.wateringRule);
      updated = { ...flower, nextWateringAt };
      return updated;
    });

    await this.shelveModel.findByIdAndUpdate(shelfId, {
      flowers: updatedFlowersToSave,
    });
    return updated;
  }

  async updateFlowerImage (shelfId, flowerId, fileKey, user: User) {
    const shelf = await this.shelvesService.getShelfById(shelfId, user);
    const flowerIndex = shelf.flowers.findIndex(f => f.id === flowerId);

    if (flowerIndex === -1) {
      throw new NotFoundException(`Flower with ID "${flowerId}" not found`);
    }

    const updatedFlower = {
      ...shelf.flowers[flowerIndex],
      picturePath: fileKey
    };

    shelf.flowers[flowerIndex] = updatedFlower;
    const updatedShelf = await this.shelveModel.findByIdAndUpdate(shelfId, {
      flowers: shelf.flowers }, { new: true })
    return updatedShelf.flowers[flowerIndex];
  }

  async getFlowerData(flowerId: string, user: User): Promise<FlowerData> {
    const shelf: Shelf = await this.shelveModel.findOne({
      'ownerId': user.id,
      'flowers.id': flowerId,
    });

    if (!shelf) {
      throw new NotFoundException(`Flower with ID "${flowerId}" not found`);
    }

    const { _id, location, flowers } = shelf;
    
    return {
      flower: flowers.find(({ id }: Flower) => flowerId === id),
      shelf: { _id, location }
    };
  }

  async removeFlower(flowerId: string, user: User): Promise<any> {
    try {
      const session = await this.shelveModel.db.startSession();
      session.startTransaction();
      try {
        let shelf: Shelf = await this.shelveModel.findOne({
          'ownerId': user.id,
          'flowers.id': flowerId,
        });

        if (!shelf) {
          await session.abortTransaction();
          throw new NotFoundException(`Flower with ID "${flowerId}" not found`);
        }

        const flowerIndex = shelf.flowers.findIndex(({ id }: Flower) => flowerId === id);

        const removedFlowersToSave = {
          ownerId: shelf.ownerId,
          createdAt: new Date(),
          flower: shelf.flowers.splice(flowerIndex, 1)[0],
        };

        await this.removedFlowersModel.insertMany([removedFlowersToSave]);

        shelf = await this.shelveModel.findByIdAndUpdate(shelf._id, { flowers: shelf.flowers }, { new: true })
          .session(session)
          .exec();

        await session.commitTransaction();
        this.logger.verbose(`Flower '${flowerId}' removed`);

        return shelf;

      } catch (error) {
        await session.abortTransaction();
        this.logger.error(`Flower '${flowerId}' couldn\'t removed`);
        this.logger.error(error);
      } finally {
        session.endSession();
      }
    } catch (error) {
      this.logger.error(error);
      this.logger.error('Transaction couldn\'t create');
    }
  }
}
