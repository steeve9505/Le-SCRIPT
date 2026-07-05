import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('certifiers')
export class Certifier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  gender: string; // 'male', 'female', 'other'

  @Column({ type: 'integer', default: 0 })
  totalReactions: number;

  @Column({ type: 'varchar', nullable: true })
  badgeLevel: string; // 'or', 'vert', 'violet'

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}