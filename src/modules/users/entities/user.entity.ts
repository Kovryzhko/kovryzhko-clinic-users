import { BaseModel } from "src/shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'users' })
export class User extends BaseModel {
    @Column({ nullable: true })
    name?: string

}