import { Users } from 'src/common/users/entities';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class UsersLogin {
  @PrimaryColumn()
  private email: string;

  @OneToOne(() => Users, {
    cascade: ['insert', 'update'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'username',
  })
  private username: Users;

  @CreateDateColumn({ type: 'timestamp' })
  private created_at: Date;

  @Column()
  private password: string;
}
