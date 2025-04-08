import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AUTH_DB_HOST,
      port: parseInt(process.env.AUTH_DB_PORT ?? '5432', 10),
      username: process.env.AUTH_DB_USERNAME,
      password: process.env.AUTH_DB_PASSWORD,
      database: process.env.AUTH_DB_DATABASE,
      entities: [User],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User]),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_SERVER,
        port: parseInt(process.env.MAIL_PORT ?? '587',10),
        secure: process.env.MAIL_USE_SSL === 'true',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_USERNAME}>`,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
