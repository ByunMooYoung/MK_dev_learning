import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { const_config } from './constants/env.constants';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  /********************
   * 1. app 생성
   *******************/
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by'); // request,response header에 서버정보 제거
  /********************
   * 2. 미들웨어 설정
   *******************/
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorater가 없는 속성 (what is decorater)일 경우 해당 속성 제거
      forbidNonWhitelisted: false, //
      transform: true, // front -> back 올때 바로 형변환
    }),
  );
  /********************
   * 3. 스웨거
   *******************/
  const swaggerConfig = new DocumentBuilder()
    .setTitle('API test')
    .setDescription('this is not API...')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/api', app, document);
  /********************
   * 4. 서버 실행
   *******************/
  await app.listen(const_config.port);
}
bootstrap();
