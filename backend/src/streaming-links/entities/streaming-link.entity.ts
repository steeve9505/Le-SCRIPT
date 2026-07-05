import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('streaming_links')
export class StreamingLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  projectId: string;

  @ManyToOne(() => Project, (project) => project.streamingLinks, { onDelete: 'CASCADE' })
  project: Project;

  @Column({ type: 'varchar' }) // spotify, apple_music, youtube, soundcloud, etc.
  platform: string;

  @Column({ type: 'varchar' })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}