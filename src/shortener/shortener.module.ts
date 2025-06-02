import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { Url } from './url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
