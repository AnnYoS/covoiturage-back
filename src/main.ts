import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as Config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './interfaces/swagger-config.interface';
import { DriveModule } from './drive/drive.module';
import { UserModule } from './user/user.module';
import { AppConfig } from './interfaces/app-config.interface';

async function bootstrap(config: AppConfig, swagger: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  const options = new DocumentBuilder()
    .setTitle(swagger.title)
    .setDescription(swagger.description)
    .setVersion(swagger.version)
    .addTag(swagger.tag)
    .build();

  const peopleDocument = SwaggerModule.createDocument(app, options, {
    include: [ UserModule, DriveModule ],
  });
  SwaggerModule.setup(swagger.path, app, peopleDocument);

  await app.listen(config.port, config.host);
  Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');
}
bootstrap(Config.get<AppConfig>('server'), Config.get<SwaggerConfig>('swagger'));
