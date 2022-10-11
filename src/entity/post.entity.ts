import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post  {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @ManyToOne(_type => User, _type => _type.posts)
  user: User
}