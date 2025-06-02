import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UrlResponseDto } from './dto/url-response.dto';
import { OptionalAuthGuard } from 'src/common/guards/optional-auth.guards';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

 @Post('shorten')
@UseGuards(OptionalAuthGuard) 
@ApiBearerAuth()
@ApiBody({ type: CreateUrlDto })
@ApiResponse({ status: 201, type: UrlResponseDto })
async create(
  @Body() dto: CreateUrlDto,
  @CurrentUser() userId?: string,
): Promise<UrlResponseDto> {
    return this.shortenerService.create(dto, userId);
}

  @Get(':code')
  @Redirect()
  async redirect(@Param('code') code: string) {
    const { originalUrl } = await this.shortenerService.redirect(code);
    return { url: originalUrl }; 
  }


  @UseGuards(JwtAuthGuard)
  @Get('user/urls')
  list(@CurrentUser() userId: string) {
    return this.shortenerService.listByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/urls/:id')
  update(
    @Param('id') id: string,
    @Body('url') newUrl: string,
    @CurrentUser() userId: string,
  ) {
    return this.shortenerService.update(id, newUrl, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/urls/:id')
  remove(@Param('id') id: string, @CurrentUser() userId: string) {
    return this.shortenerService.remove(id, userId);
  }
}
