import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Role } from './role.entity'

export enum Gender {
    WOMAN = 'woman',
    MAN = 'man'
}

@Entity()
export class User {
    @PrimaryColumn()
    username: string

    @Column({ type: 'char', length: 14, nullable: true, unique: true })
    phone: string

    @Column({ length: 100 })
    name: string

    @Column({ nullable: true })
    address: string

    @Column({ enum: Gender, type: 'enum' })
    gender: Gender

    @Column({ nullable: true, type: 'varchar' })
    img_profile: string

    @ManyToOne(() => Role, {
        cascade: ['insert', 'update', 'remove']
    })
    @JoinColumn({ name: 'role_id'})
    @Column({default: 1})
    role_id: number

}
