import { compareHash, hash } from '@/utils/utils.constants';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  @CreateDateColumn()
  create_datetime: Date;

  @Column()
  @UpdateDateColumn()
  update_datetime: Date;

  @Column({ nullable: true })
  @DeleteDateColumn()
  delete_datetime: Date;

  @BeforeInsert()
  async hash(): Promise<void> {
    this.password = await hash(this.password);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await compareHash(password, this.password);
  }
}
