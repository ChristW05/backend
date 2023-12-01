import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieParser);
  app.enableCors({
    // origin:'http://localhost:8000',
    credentials: true
  });
  
  const config = new DocumentBuilder()
  .setTitle('COLIS API')
  .setDescription('COLIS API AUTH')
  .setVersion('1.0')
  .addTag('USERS')
  .build();
  const Document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, Document);

  await app.listen(8000);
}
bootstrap();
