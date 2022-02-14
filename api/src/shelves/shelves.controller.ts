import {Controller, Get, Logger, UseGuards, Post, Body, Patch, Delete, Param, Req, Res, BadRequestException } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MoveFlowerDto } from './dto/move-flower.dto';
import { CreateShelfDto } from './dto/create-shelf.dto';
import { EditShelfDto } from './dto/edit-shelf.dto';
import { ShelvesService } from './shelves.service';
import { Shelf } from './schemas/shelf.schemas';
import { FileUploadService } from '../aws/s3/file-upload.service';

@UseGuards(JwtAuthGuard)
@Controller('shelves')
export class ShelvesController {
  private logger = new Logger('ShelvesController');

  constructor(
    private shelvesService: ShelvesService,
    private fileUploadService: FileUploadService,
  ) {}

  @Get()
  getUserShelves(@GetUser() user: User):Promise<Shelf[]> {
    this.logger.verbose(`User '${user.id}' retrieving all shelves.`)

    return this.shelvesService.getAllShelves(user);
  }

  @Get('virtual')
  getVirtualShelf(@GetUser() user: User):Promise<Shelf> {
    this.logger.verbose(`User '${user.id}' retrieving virtual shelf.`);

    return this.shelvesService.getVirtualShelf(user);
  }

  @Get('/:id')
    getShelfById(@Param('id') id: string,
    @GetUser() user: User): Promise<Shelf> {
    this.logger.verbose(`User '${user.id} retrieving the shelf with ${id}'`)

    return this.shelvesService.getSharedShelfById(id, user)
  }

  @Post()
  createShelve(
    @Body() createShelfDto: CreateShelfDto,
    @GetUser() user: User): Promise<Shelf> {
    this.logger.verbose(`User '${user.id} creating a new Shelve. Data: ${JSON.stringify(createShelfDto)}'`)

    return this.shelvesService.createShelve(createShelfDto, user);
  }

  @Patch()
  updateShelf(@Body() editShelfDto: EditShelfDto, @GetUser() user: User): Promise<Shelf> {
    this.logger.verbose(`User '${user.id}' updating shelf '${editShelfDto.id}'. Data: ${JSON.stringify(editShelfDto)}'`)

    return this.shelvesService.updateShelf( editShelfDto, user);
  }

  @Patch('moveFlower')
  updateFlowersShelf(@Body() moveFlowerDto: MoveFlowerDto, @GetUser() user: User): Promise<void> {
    this.logger.verbose(`User '${user.id}' updating shelf '${moveFlowerDto.shelfFromId}'. Data: ${JSON.stringify(moveFlowerDto)}'`)

    return this.shelvesService.moveFlower(moveFlowerDto, user);
  }

  @Delete(':id')
  removeShelf(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.shelvesService.removeShelf(id, user);
  }
  
  @Patch('update-image/:id')
  async updateImage(@Req() request, @Res() response, @GetUser() user: User,  @Param('id') id: string) {
    try {
      const fileKey = await this.fileUploadService.uploadSingleFile(request, response);
      const shelfModel = await this.shelvesService.updateShelfPath( id, fileKey, user);
      response.send(shelfModel);
    } catch(e) {
      console.log(e)
      throw new BadRequestException(e.message);
    }
  }
}
