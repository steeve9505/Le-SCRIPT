import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Certification } from './entities/certification.entity';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class CertificationsService {
  private readonly CERTIFICATIONS = [
    { level: 'Bronze', pointsRequired: 50 },
    { level: 'Or', pointsRequired: 250 },
    { level: 'Platine', pointsRequired: 500 },
    { level: 'Diamant', pointsRequired: 1000 },
  ];

  constructor(
    @InjectRepository(Certification)
    private certificationsRepository: Repository<Certification>,
    private projectsService: ProjectsService,
  ) {}

  async checkAndCreateCertification(projectId: string, currentPoints: number) {
    const project = await this.projectsService.findById(projectId);
    const existingCertifications = await this.findByProjectId(projectId);

    for (const cert of this.CERTIFICATIONS) {
      if (
        currentPoints >= cert.pointsRequired &&
        !existingCertifications.some((c) => c.level === cert.level)
      ) {
        const newCert = this.certificationsRepository.create({
          projectId,
          level: cert.level,
          pointsRequired: cert.pointsRequired,
        });

        await this.certificationsRepository.save(newCert);

        // Mettre à jour la certification actuelle du projet
        await this.projectsService.update(projectId, {
          currentCertification: cert.level,
        });

        return newCert;
      }
    }

    return null;
  }

  async findByProjectId(projectId: string) {
    return this.certificationsRepository.find({
      where: { projectId },
    });
  }

  async findById(id: string) {
    return this.certificationsRepository.findOne({
      where: { id },
    });
  }
}