import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Reaction } from '../../reactions/entities/reaction.entity';
import { Certification } from '../../certifications/entities/certification.entity';
import { StreamingLink } from '../../streaming-links/entities/streaming-link.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.projects, { onDelete: 'CASCADE' })
  artist: Artist;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  coverImageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  currentCertification: string; // Bronze, Or, Platine, Diamant

  @Column({ type: 'integer', default: 0 })
  totalPoints: number;

  @OneToMany(() => Reaction, (reaction) => reaction.project, { cascade: true })
  reactions: Reaction[];

  @OneToMany(() => Certification, (certification) => certification.project, { cascade: true })
  certifications: Certification[];

  @OneToMany(() => StreamingLink, (link) => link.project, { cascade: true })
  streamingLinks: StreamingLink[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}