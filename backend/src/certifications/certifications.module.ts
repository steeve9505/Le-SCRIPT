import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationsService } from './certifications.service';
import { CertificationsController } from './certifications.controller';
import { Certification } from './entities/certification.entity';
import { ProjectsModule } from '../projects/projects.module';
import { EmailsModule } from '../emails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([Certification]), ProjectsModule, EmailsModule],
  providers: [CertificationsService],
  controllers: [CertificationsController],
  exports: [CertificationsService],
})
export class CertificationsModule {}