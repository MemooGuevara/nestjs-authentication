import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Configuration } from './config/config.keys'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  static port: number | string

  constructor (private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT)
  }
}
