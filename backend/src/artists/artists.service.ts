import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto, userId: string) {
    const artist = this.artistsRepository.create({
      ...createArtistDto,
      userId,
    });
    return this.artistsRepository.save(artist);
  }

  async findById(id: string) {
    return this.artistsRepository.findOne({
      where: { id },
      relations: ['projects'],
    });
  }

  async findByUserId(userId: string) {
    return this.artistsRepository.findOne({
      where: { userId },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.artistsRepository.update(id, updateArtistDto);
    return this.findById(id);
  }

  async findAll() {
    return this.artistsRepository.find({
      relations: ['projects'],
    });
  }
}