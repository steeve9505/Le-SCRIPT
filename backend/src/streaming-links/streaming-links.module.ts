import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingLinksService } from './streaming-links.service';
import { StreamingLinksController } from './streaming-links.controller';
import { StreamingLink } from './entities/streaming-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StreamingLink])],
  providers: [StreamingLinksService],
  controllers: [StreamingLinksController],
  exports: [StreamingLinksService],
})
export class StreamingLinksModule {}