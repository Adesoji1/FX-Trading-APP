
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport, RmqOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';


type RmqInnerOptsWithReconnect = NonNullable<RmqOptions['options']> & {
  reconnectTimeInSeconds?: number;
};


interface RmqOptionsWithReconnect extends Omit<RmqOptions, 'options'> {
  options: RmqInnerOptsWithReconnect;
}

async function bootstrap() {
  const logger = new Logger('AuthBootstrap');

  const microserviceOptions: RmqOptionsWithReconnect = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL ?? 'amqp://guest:guest@rabbitmq:5672'],
      queue: 'auth_queue',
      queueOptions: { durable: true },

      socketOptions: { heartbeat: 60 },
      reconnectTimeInSeconds: 5,
    },
  };

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microserviceOptions as unknown as MicroserviceOptions, 
  );

  app.useLogger(logger);
  await app.listen();
  logger.log('Auth microservice is running.');
}

bootstrap();
