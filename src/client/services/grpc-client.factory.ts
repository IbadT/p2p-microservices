import { Injectable } from '@nestjs/common';
import { ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class GrpcClientFactory {
  createClient(service: string): any {
    return {
      getService: (name: string) => {
        return {
          name,
          transport: Transport.GRPC,
          options: {
            package: service,
            protoPath: join(__dirname, `../../proto/${service}.proto`),
          },
        };
      },
    };
  }
} 