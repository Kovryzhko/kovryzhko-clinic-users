import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PROTO_PATHS } from 'kovryzhko-clinic-contracts';
import { AccountClientGrpc } from './account.grpc';
import { GrpcModule } from 'kovryzhko-clinic-common/dist/grpc/grpc.module'

@Module({
  imports: [GrpcModule.register(['ACCOUNT_PACKAGE'])],
  controllers: [],
  providers: [AccountClientGrpc],
  exports: [AccountClientGrpc]
})
export class AccountModule { }
