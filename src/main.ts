import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger()

  app.setGlobalPrefix('api')

  await app.listen(AppModule.port).then(async () => logger.log(`Server is running on ${await app.getUrl()}`))
}

bootstrap().catch(console.error)
