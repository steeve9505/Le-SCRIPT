import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { CreateReactionDto } from './dto/reaction.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class ReactionsService {
  private readonly POINTS_MAP = {
    like: 1,
    dislike: -1,
    comment: 2,
    share: 4,
    joker: 50,
  };

  constructor(
    @InjectRepository(Reaction)
    private reactionsRepository: Repository<Reaction>,
    private projectsService: ProjectsService,
  ) {}

  async create(createReactionDto: CreateReactionDto, certifierId: string) {
    const { projectId, type, content } = createReactionDto;

    if (!this.POINTS_MAP[type]) {
      throw new BadRequestException('Invalid reaction type');
    }

    const points = this.POINTS_MAP[type];

    const reaction = this.reactionsRepository.create({
      projectId,
      certifierId,
      type,
      points,
      content,
    });

    await this.reactionsRepository.save(reaction);

    // Mettre à jour les points du projet
    await this.projectsService.updatePoints(projectId, points);

    return reaction;
  }

  async findByProjectId(projectId: string) {
    return this.reactionsRepository.find({
      where: { projectId },
      relations: ['certifier'],
    });
  }

  async findByCertifierId(certifierId: string) {
    return this.reactionsRepository.find({
      where: { certifierId },
      relations: ['project'],
    });
  }

  async getTotalPoints(certifierId: string) {
    const reactions = await this.findByCertifierId(certifierId);
    return reactions.reduce((sum, reaction) => sum + reaction.points, 0);
  }
}