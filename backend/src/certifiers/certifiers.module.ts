import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertifiersService } from './certifiers.service';
import { CertifiersController } from './certifiers.controller';
import { Certifier } from './entities/certifier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certifier])],
  providers: [CertifiersService],
  controllers: [CertifiersController],
  exports: [CertifiersService],
})
export class CertifiersModule {}