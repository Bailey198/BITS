import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Blog APIs')
  .setDescription("List APIs for simple blog by NXB Dev")
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../../uploads'))
  await app.listen(5000);
}
bootstrap();
