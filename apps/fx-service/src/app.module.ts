import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FxController } from './fx.controller';
import { FxService } from './fx.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
  ],
  controllers: [FxController],
  providers: [FxService],
})
export class AppModule {}
