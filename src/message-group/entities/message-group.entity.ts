import { User } from '@/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MessageGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;

  @Column()
  @CreateDateColumn()
  create_datetime: Date;

  @Column()
  @UpdateDateColumn()
  update_datetime: Date;

  @Column({ nullable: true })
  @DeleteDateColumn()
  delete_datetime: Date;
}
