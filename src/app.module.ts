import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ShortenerModule } from './shortener/shortener.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASS || '123',
      database: process.env.DB_NAME || 'shortener',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ShortenerModule,
  ],
})
export class AppModule {}
