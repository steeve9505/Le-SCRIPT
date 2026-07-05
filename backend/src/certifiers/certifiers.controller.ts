import { Controller, Post, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CertifiersService } from './certifiers.service';
import { CreateCertifierDto, UpdateCertifierDto } from './dto/certifier.dto';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('certifiers')
export class CertifiersController {
  constructor(private certifiersService: CertifiersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCertifierDto: CreateCertifierDto, @GetUser() user: any) {
    return this.certifiersService.create(createCertifierDto, user.userId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.certifiersService.findById(id);
  }

  @Get()
  findAll() {
    return this.certifiersService.findAll();
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCertifierDto: UpdateCertifierDto) {
    return this.certifiersService.update(id, updateCertifierDto);
  }
}