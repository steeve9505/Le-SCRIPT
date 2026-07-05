import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/reaction.dto';
import { GetUser } from '../common/decorators/get-user.decorator';

@Controller('reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createReactionDto: CreateReactionDto, @GetUser() user: any) {
    return this.reactionsService.create(createReactionDto, user.certifierId);
  }

  @Get('project/:projectId')
  findByProjectId(@Param('projectId') projectId: string) {
    return this.reactionsService.findByProjectId(projectId);
  }

  @Get('certifier/:certifierId/total')
  getTotalPoints(@Param('certifierId') certifierId: string) {
    return this.reactionsService.getTotalPoints(certifierId);
  }
}