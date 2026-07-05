import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('certifications')
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  projectId: string;

  @ManyToOne(() => Project, (project) => project.certifications, { onDelete: 'CASCADE' })
  project: Project;

  @Column({ type: 'varchar' }) // Bronze, Or, Platine, Diamant
  level: string;

  @Column({ type: 'integer' }) // 50, 250, 500, 1000
  pointsRequired: number;

  @CreateDateColumn()
  achievedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}