import {
  Controller,
  Res,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UnauthorizedException,
  Req,
  BadRequestException
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { User } from './schemas/user.schema';
import { FileUploadService } from '../aws/s3/file-upload.service';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user-dto';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private fileUploadService: FileUploadService,
    private usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getProfile(@GetUser() user) {
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.usersService.findProfileByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/')
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user) {
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.usersService.updateUser(user.id, updateUserDto);
  }

  @Post('update-image')
  async updateImage(@Req() request, @Res() response, @GetUser() user: User) {
    try {
      const fileKey = await this.fileUploadService.uploadSingleFile(request, response);
      const userModel = await this.usersService.updateUserAvatarLink(user.id, fileKey);
      response.send(this.usersService.convertToPlainObject(userModel));
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
}
