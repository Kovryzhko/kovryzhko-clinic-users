import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) { }

    public findById(id: string) {
        return this.repository.findOne({ where: { id } })
    }

    public create(data: Partial<User>) {
        const user = this.repository.create(data)

        return this.repository.save(user)
    }

    public async update(data: Partial<User>) {
        const { id, ...newData } = data 

        if (!id) return

        const result = await this.repository.update({ id: data.id }, newData)
        if (!result.affected) return 

        return true
    }
}