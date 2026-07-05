import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StreamingLink } from './entities/streaming-link.entity';
import { CreateStreamingLinkDto } from './dto/streaming-link.dto';

@Injectable()
export class StreamingLinksService {
  private readonly PLATFORM_LOGOS = {
    spotify: '🎵',
    apple_music: '🍎',
    youtube_music: '📺',
    soundcloud: '☁️',
    bandcamp: '🎼',
    deezer: '🎧',
    tidal: '🎹',
    amazon_music: '📻',
  };

  constructor(
    @InjectRepository(StreamingLink)
    private streamingLinksRepository: Repository<StreamingLink>,
  ) {}

  async create(createStreamingLinkDto: CreateStreamingLinkDto) {
    const { projectId, platform, url } = createStreamingLinkDto;

    if (!this.PLATFORM_LOGOS[platform]) {
      throw new BadRequestException('Invalid platform');
    }

    if (!this.isValidUrl(url)) {
      throw new BadRequestException('Invalid URL');
    }

    const streamingLink = this.streamingLinksRepository.create({
      projectId,
      platform,
      url,
    });

    return this.streamingLinksRepository.save(streamingLink);
  }

  async findByProjectId(projectId: string) {
    return this.streamingLinksRepository.find({
      where: { projectId },
    });
  }

  async delete(id: string) {
    return this.streamingLinksRepository.delete(id);
  }

  getPlatformLogo(platform: string): string {
    return this.PLATFORM_LOGOS[platform] || '🎵';
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}