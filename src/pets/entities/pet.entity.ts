import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
