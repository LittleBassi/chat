import { MessageGroup } from '@/message-group/entities/message-group.entity';
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
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_reciever_id' })
  @Column({ nullable: true })
  user_reciever_id: number;

  @ManyToOne(() => MessageGroup, (group) => group.id)
  @JoinColumn({ name: 'message_group_id' })
  @Column({ nullable: true })
  message_group_id: number;

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
