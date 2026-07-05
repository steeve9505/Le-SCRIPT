import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Certifier } from './entities/certifier.entity';
import { CreateCertifierDto, UpdateCertifierDto } from './dto/certifier.dto';

@Injectable()
export class CertifiersService {
  private readonly BADGE_THRESHOLDS = {
    or: 100,
    vert: 200,
    violet: 500,
  };

  constructor(
    @InjectRepository(Certifier)
    private certifiersRepository: Repository<Certifier>,
  ) {}

  async create(createCertifierDto: CreateCertifierDto, userId: string) {
    const certifier = this.certifiersRepository.create({
      ...createCertifierDto,
      userId,
    });
    return this.certifiersRepository.save(certifier);
  }

  async findById(id: string) {
    return this.certifiersRepository.findOne({
      where: { id },
    });
  }

  async findByUserId(userId: string) {
    return this.certifiersRepository.findOne({
      where: { userId },
    });
  }

  async updateTotalReactions(certifierId: string, reactions: number) {
    const certifier = await this.findById(certifierId);
    if (!certifier) return null;

    certifier.totalReactions += reactions;
    this.updateBadgeLevel(certifier);

    return this.certifiersRepository.save(certifier);
  }

  private updateBadgeLevel(certifier: Certifier) {
    if (certifier.totalReactions >= this.BADGE_THRESHOLDS.violet) {
      certifier.badgeLevel = 'violet';
    } else if (certifier.totalReactions >= this.BADGE_THRESHOLDS.vert) {
      certifier.badgeLevel = 'vert';
    } else if (certifier.totalReactions >= this.BADGE_THRESHOLDS.or) {
      certifier.badgeLevel = 'or';
    } else {
      certifier.badgeLevel = null;
    }
  }

  async findAll() {
    return this.certifiersRepository.find();
  }

  async update(id: string, updateCertifierDto: UpdateCertifierDto) {
    await this.certifiersRepository.update(id, updateCertifierDto);
    return this.findById(id);
  }
}