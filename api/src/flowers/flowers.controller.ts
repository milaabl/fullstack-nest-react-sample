import { UseGuards, Controller, Logger, Get, Patch, Param, Post, Body, Res, Req, BadRequestException, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/schemas/user.schema';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { EditFlowerDto } from './dto/edit-flower.dto';
import { FlowersService } from './flowers.service';
import { FileUploadService } from '../aws/s3/file-upload.service';
import { FlowerData } from './interfaces';

@UseGuards(JwtAuthGuard)
@Controller('flowers')
export class FlowersController {
  private logger = new Logger('FlowersController');

  constructor(
    private flowersService: FlowersService,
    private fileUploadService: FileUploadService
  ) {}

  @Get()
  getFlowers(
    @GetUser() user: User,
  ):void {
    this.logger.verbose(`User '${user.id}' retrieving all flowers.`);
  }

  @Get('/:id')
  getFlowerDataById(
    @GetUser() user: User,
    @Param('id') id: string
  ): Promise<FlowerData> {
    return this.flowersService.getFlowerData(id, user);
  }

  @Post()
  createFlower(
    @Body() createFlowerDto: CreateFlowerDto,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(`User '${user.id} creating a new Flower. Data: ${JSON.stringify(createFlowerDto)}'`);

    return this.flowersService.createFlower(createFlowerDto, user);
  }

  @Patch()
  updateFlower(
    @Body() editFlowerDto: EditFlowerDto,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(`User '${user.id}' updating flower '${editFlowerDto.id}'. Data: ${JSON.stringify(editFlowerDto)}'`)

    return this.flowersService.updateFlower(editFlowerDto, user);
  }

  @Get('/:shelfId/water/:flowerId')
  waterFlower(
    @Param('shelfId') shelfId: string,
    @Param('flowerId') flowerId: string,
    @GetUser() user: User
  ): Promise<void> {
    return this.flowersService.waterFlower(shelfId, flowerId, user);
  }

  @Patch('update-image/:shelfId/image/:flowerId')
  async updateImage(@Req() request, @Res() response, @GetUser() user: User, @Param('shelfId') shelfId: string,
    @Param('flowerId') flowerId: string) {
    try {
      const fileKey = await this.fileUploadService.uploadSingleFile(request, response);
      const shelfModel = await this.flowersService.updateFlowerImage(shelfId, flowerId, fileKey, user);
      response.send(shelfModel);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  
  @Delete('/:flowerId')
  removeFlower(
    @Param('flowerId') flowerId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.flowersService.removeFlower(flowerId, user);
  }
}
