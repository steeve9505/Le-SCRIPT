import { Controller, Post, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ArtistsService } from './artists.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('artists')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createArtistDto: CreateArtistDto, @GetUser() user: any) {
    return this.artistsService.create(createArtistDto, user.userId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.artistsService.findById(id);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }
}