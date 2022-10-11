import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Post } from "./post.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @OneToMany(_type => Post, _type => _type.user)
    posts: Post[]
}
