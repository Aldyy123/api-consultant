import { User } from 'src/common/users/entities'
import { Entity, Column, CreateDateColumn, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm'

@Entity()
export class UserLogin {
    @PrimaryColumn()
    private email: string

    @OneToOne(() => User, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'username'
    })
    private username: User

    @CreateDateColumn({ type: 'timestamp' })
    private created_at: Date

    @Column()
    private password: string

}
