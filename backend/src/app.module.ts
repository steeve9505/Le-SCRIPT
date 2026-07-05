import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ArtistsModule } from './artists/artists.module';
import { CertifiersModule } from './certifiers/certifiers.module';
import { ProjectsModule } from './projects/projects.module';
import { ReactionsModule } from './reactions/reactions.module';
import { CertificationsModule } from './certifications/certifications.module';
import { PaymentsModule } from './payments/payments.module';
import { EmailsModule } from './emails/emails.module';
import { StreamingLinksModule } from './streaming-links/streaming-links.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'le_script',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    ArtistsModule,
    CertifiersModule,
    ProjectsModule,
    ReactionsModule,
    CertificationsModule,
    PaymentsModule,
    EmailsModule,
    StreamingLinksModule,
    AdminModule,
  ],
})
export class AppModule {}