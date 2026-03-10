import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserRequest, CreateUserResponse, GetMeRequest, GetMeResponse, UserPatchRequest, UserPatchResponse } from 'kovryzhko-clinic-contracts/gen/user';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @GrpcMethod('UserService', 'CreateUser')
  public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
    await this.usersService.create(data)
    return { ok: true }
  }

  @GrpcMethod('UserService', 'GetMe')
  public async getMe(req: GetMeRequest): Promise<GetMeResponse> {
    return await this.usersService.getMe(req)
  }

  @GrpcMethod('UserService', 'ChangeSettings')
  public async patch(req: UserPatchRequest): Promise<UserPatchResponse> {
    return await this.usersService.update(req)
  }
}
