import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Certifier } from '../../certifiers/entities/certifier.entity';

@Entity('reactions')
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  projectId: string;

  @ManyToOne(() => Project, (project) => project.reactions, { onDelete: 'CASCADE' })
  project: Project;

  @Column({ type: 'uuid' })
  certifierId: string;

  @ManyToOne(() => Certifier)
  certifier: Certifier;

  @Column({ type: 'varchar' }) // 'like', 'dislike', 'comment', 'share', 'joker'
  type: string;

  @Column({ type: 'integer' }) // +1, -1, +2, +4, +50
  points: number;

  @Column({ type: 'text', nullable: true })
  content: string; // Pour les commentaires

  @CreateDateColumn()
  createdAt: Date;
}