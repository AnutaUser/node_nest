import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Address {
  @Column({ type: 'varchar', nullable: true })
  kode?: string;

  @Column({ type: 'varchar', nullable: true })
  city?: string;

  @Column({ type: 'varchar', nullable: true })
  street?: string;

  @Column({ type: 'varchar', nullable: true })
  number?: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  username: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Exclude()
  password: string;

  @Column(() => Address)
  address: Address;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

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
