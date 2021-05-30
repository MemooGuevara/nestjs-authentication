import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Configuration } from '../../config/config.keys'

const dirnamePath = __dirname

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      url: configService.get(Configuration.DB_URL),
      // host: configService.get(Configuration.DB_HOST),
      // port: +configService.get<number>(Configuration.DB_PORT),
      // username: configService.get(Configuration.DB_USERNAME),
      // password: configService.get(Configuration.DB_PASSWORD),
      // database: configService.get(Configuration.DB_DATABASE),
      entities: [`${dirnamePath}/../../**/**/**/*.entity{.ts,.js}`],
      migrations: [`${dirnamePath}/migrations/*{.ts,.js}`],
      synchronize: true
    })
  })
]
