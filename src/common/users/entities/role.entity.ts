import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum Roles {
    ADMIN = 'admin',
    USER = 'user',
    TECHNICIAN = 'technician'
}

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ enum: Roles, type: 'enum' })
    role: string

}
