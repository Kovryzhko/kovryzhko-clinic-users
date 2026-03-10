import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function getTypeOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
        type: 'postgres',
        host: configService.getOrThrow("DB_HOST"),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
    }
}