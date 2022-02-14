import { Injectable, NotFoundException, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { User } from 'src/users/schemas/user.schema';
import { Shelf } from './schemas/shelf.schemas';
import { VirtualShelf } from './schemas/virtual-shelf.schemas';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { EditShelfDto } from './dto/edit-shelf.dto';
import { MoveFlowerDto } from './dto/move-flower.dto'

@Injectable()
export class ShelvesService {
  private logger = new Logger('ShelvesService');

  constructor(@InjectModel(Shelf.name) private readonly shelveModel: Model<Shelf>,
    @InjectModel(VirtualShelf.name) private readonly virtualShelveModel: Model<VirtualShelf>,
  ) {}

  async getAllShelves(user:User):Promise<Shelf[]> {
    return this.shelveModel.find({ users: user.id , virtual: false}).exec();
  }

  async createShelve(createShelfDto:CreateShelfDto, user: User):Promise<Shelf> {
    const newShelve = {
      ...createShelfDto,
      ownerId: user.id,
      createdAt: new Date(),
      users:[user.id],
      flowers:[],
      virtual: false
    };

    const createdShelve: Shelf = new this.shelveModel(newShelve);

    return createdShelve.save();
  }

  async getSharedShelfById(id: string, user: User): Promise<Shelf> {
    const found = await this.shelveModel.findOne({_id: id, users: user.id});
    if (!found) {
      throw new NotFoundException(`Shelf with ID "${id}" not found`);
    }
    return found;
  }

  async getShelfById(id: string, user: User): Promise<Shelf> {
    const found = await this.shelveModel.findOne({_id: id, ownerId: user.id});
    if (!found) {
      throw new NotFoundException(`Shelf with ID "${id}" not found`);
    }
    return found;
  }

  async updateShelf(editShelfDto: EditShelfDto, user: User): Promise<Shelf>  {
    const { id, location, description } = editShelfDto;
    const shelfFound = await this.getShelfById(id, user);
    if (shelfFound) {
      const updatedShelf = await this.shelveModel.findByIdAndUpdate(id, {location, description}, {
        new: true,
      });
      return updatedShelf;
    }
    return null;
  }

  async moveFlower(moveFlowerDto: MoveFlowerDto, user: User) {
    try {
        const session = await this.shelveModel.db.startSession();
        session.startTransaction();
        try {
          const { shelfFromId, shelfToId, flowerId } = moveFlowerDto;
          const foundShelfFrom = await this.getShelfById ( shelfFromId, user );
          const foundShelfTo = await this.getShelfById ( shelfToId, user );
          const flowerMoveIndex = foundShelfFrom.flowers.findIndex(f => f.id === flowerId);

          if (flowerMoveIndex === -1 ) {
            await session.abortTransaction();
            throw new NotFoundException(`Flower with ID "${flowerId}" not found`);
          }

          foundShelfTo.flowers.push( foundShelfFrom.flowers[flowerMoveIndex]);
          foundShelfFrom.flowers.splice(flowerMoveIndex,1);

          await this.shelveModel.findOneAndUpdate(
            { _id: shelfFromId },{ flowers : foundShelfFrom.flowers }, { new: true })
                .session(session)
                .exec();

          await this.shelveModel.findOneAndUpdate(
            { _id: shelfToId },{ flowers : foundShelfTo.flowers }, { new: true })
                .session(session)
                .exec();

          await session.commitTransaction();
          this.logger.verbose(`Shelf '${moveFlowerDto.shelfFromId}'updated`);
            
        } catch (error) {
            await session.abortTransaction();
            this.logger.error(`Shelf '${moveFlowerDto.shelfFromId}' couldn\'t update`);
            this.logger.error(error);
        } finally {
            session.endSession();
        }
    } catch (error) {
        this.logger.error(error);
        this.logger.error('Transaction couldn\'t create');
    }
  }

  async removeShelf(id: string, user: User): Promise<void> {
    const shelfFound = await this.getShelfById(id, user);

    if (!shelfFound) {
      return null;
    }

    const virtualShelf = await this.shelveModel.findOne({ ownerId: user.id, virtual: true});

    if (!virtualShelf) {
      const newVirtualShelf = {
        flowers: [...shelfFound.flowers],
        ownerId: user.id,
        users: [user.id],
        location: 'Flowers without shelf',
        virtual: true
      }

      const createdShelve: Shelf = new this.shelveModel(newVirtualShelf);
      await createdShelve.save();
      await this.shelveModel.findByIdAndRemove(id);

      return;
    }

    virtualShelf.flowers = [...virtualShelf.flowers, ...shelfFound.flowers];
    await virtualShelf.save();
    await this.shelveModel.findByIdAndRemove(id);
  }

  async updateShelfPath (id, fileKey, user: User) {
    const updatedShelf = await this.shelveModel.findOneAndUpdate({_id:id, ownerId: user.id}, { picturePath: fileKey },{ new: true })
    const updatedShelfNotFound = !updatedShelf;
      if (updatedShelfNotFound) {
          throw new NotFoundException(`Shelf with ID "${id}" not found`);
      } else {
          return updatedShelf;
      }
  }

  async getVirtualShelf(user: User) {
    return await this.shelveModel.findOne({ ownerId: user.id, virtual: true });
  }
}
