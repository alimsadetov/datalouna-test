import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globals from './config/global.config';
import dbConfig from './config/db.config';
import { LoggerModule } from './logger/logger.module';
import { LoggerMiddleware } from './middlewares/log-incoming-request.middleware';
import { CustomLoggerService } from './logger/custom-logger.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { SkinModule } from './modules/skin/skin.module';
import { MarketModule } from './modules/market/market.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      load: [globals, dbConfig],
      isGlobal: true,
    }),
    LoggerModule,
    DatabaseModule,
    SkinModule,
    MarketModule,
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [],
  providers: [CustomLoggerService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
