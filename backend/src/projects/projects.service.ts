import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto, artistId: string) {
    const project = this.projectsRepository.create({
      ...createProjectDto,
      artistId,
    });
    return this.projectsRepository.save(project);
  }

  async findById(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['artist', 'reactions', 'certifications', 'streamingLinks'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async findByArtistId(artistId: string) {
    return this.projectsRepository.find({
      where: { artistId },
      relations: ['reactions', 'certifications', 'streamingLinks'],
    });
  }

  async findAll() {
    return this.projectsRepository.find({
      relations: ['artist', 'reactions', 'certifications', 'streamingLinks'],
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.projectsRepository.update(id, updateProjectDto);
    return this.findById(id);
  }

  async updatePoints(projectId: string, points: number) {
    const project = await this.findById(projectId);
    project.totalPoints += points;
    return this.projectsRepository.save(project);
  }
}