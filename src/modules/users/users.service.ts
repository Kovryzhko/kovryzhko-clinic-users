import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserRequest, GetMeRequest, UserPatchRequest } from 'kovryzhko-clinic-contracts/gen/user'
import { AccountClientGrpc } from '../account/account.grpc';
import { RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RpcStatus } from 'kovryzhko-clinic-common/dist/enums/rpc-status.enum'

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly accountClientGrpc: AccountClientGrpc,
    ) { }

    public async create(data: CreateUserRequest) {
        const { id } = data
        return await this.userRepository.create({ id })
    }

    public async getMe(data: GetMeRequest) {
        const { id } = data

        const user = await this.userRepository.findById(id)
        if (!user) throw new RpcException({ code: RpcStatus.NOT_FOUND, details: 'user not found' })

        const account = await this.accountClientGrpc.call('getAccount', { id })

        return {
            user: {
                id: user.id,
                name: user.name || undefined,
                phone: account.phone || undefined,
                email: account.email || undefined
            }
        }
    }

    public async update(data: UserPatchRequest) {
        const filtered = Object.fromEntries(
            Object.entries(data).filter(([key, value]) =>
                !key.startsWith('_') && value !== undefined
            )
        )

        const result = await this.userRepository.update(filtered)

        if (!result) throw new RpcException({ code: RpcStatus.NOT_FOUND, details: 'user not found' })

        return { ok: true }
    }
}
