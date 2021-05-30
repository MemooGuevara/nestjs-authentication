import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger(AppModule.name)

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(AppModule.port).then(async () => logger.log(`Server is running on ${await app.getUrl()}`))
}

bootstrap().catch(console.error)
