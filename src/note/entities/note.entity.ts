import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @VersionColumn({ default: 0 })
  public version: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  public tag: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  public title: string;

  @Column({ type: 'text', nullable: true, default: null })
  public content: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt!: Date;
}
