import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { config } from './config';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './infrastructure/lib/exception/all.exception.filter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  const api = 'api';
  app.setGlobalPrefix(api);
  const config_swagger = new DocumentBuilder()
    .setTitle('Base app')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config_swagger);
  SwaggerModule.setup(api, app, documentFactory);
  await app.listen(config.API_PORT ?? 3000);
}
bootstrap();
