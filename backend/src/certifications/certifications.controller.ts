import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CertificationsService } from './certifications.service';

@Controller('certifications')
export class CertificationsController {
  constructor(private certificationsService: CertificationsService) {}

  @Get('project/:projectId')
  findByProjectId(@Param('projectId') projectId: string) {
    return this.certificationsService.findByProjectId(projectId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.certificationsService.findById(id);
  }
}