import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StreamingLinksService } from './streaming-links.service';
import { CreateStreamingLinkDto } from './dto/streaming-link.dto';

@Controller('streaming-links')
export class StreamingLinksController {
  constructor(private streamingLinksService: StreamingLinksService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createStreamingLinkDto: CreateStreamingLinkDto) {
    return this.streamingLinksService.create(createStreamingLinkDto);
  }

  @Get('project/:projectId')
  findByProjectId(@Param('projectId') projectId: string) {
    return this.streamingLinksService.findByProjectId(projectId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.streamingLinksService.delete(id);
  }
}