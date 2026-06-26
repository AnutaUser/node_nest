import {
  Column,
  Entity,
  JoinColumn, JoinTable,
  ManyToMany, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { Staff } from '../../staff/entities/staff.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  petName: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({
    type: 'varchar',
    default: new Date().toISOString(),
    nullable: true,
  })
  createdAt: Date;

  @Column({
    type: 'varchar',
    default: new Date().toISOString(),
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => User, (entity) => entity.pets)
  @JoinTable()
  user: User;

  @ManyToMany(() => Staff, (entity) => entity.pets)
  // @JoinColumn()
  staff: Staff[];
}
