import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Url } from './url.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { randomBytes } from 'crypto';
import { UrlResponseDto } from './dto/url-response.dto';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepo: Repository<Url>,
  ) {}

  private generateCode(): string {
    return randomBytes(4).toString('base64url').substring(0, 6);
  }

  async create(dto: CreateUrlDto, userId?: string): Promise<UrlResponseDto> {
  const code = this.generateCode();

  const url = this.urlRepo.create({
    originalUrl: dto.url,
    code,
    userId: userId || null,
  });

  await this.urlRepo.save(url);

  return {
    code,
    originalUrl: dto.url,
    shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${code}`,
    userId: userId || null,
  };
}

  async redirect(code: string) {
    const url = await this.urlRepo.findOne({ where: { code, deletedAt: IsNull() } });
    if (!url) throw new NotFoundException('URL não encontrada');
    url.clicks += 1;
    await this.urlRepo.save(url);
    return { originalUrl: url.originalUrl };

  }

  async listByUser(userId: string) {
    return this.urlRepo.find({ where: { userId, deletedAt: IsNull() } });
  }

  async update(id: string, newUrl: string, userId: string) {
    const url = await this.urlRepo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!url || url.userId !== userId) throw new ForbiddenException('Acesso negado');
    url.originalUrl = newUrl;
    return this.urlRepo.save(url);
  }

  async remove(id: string, userId: string) {
    const url = await this.urlRepo.findOne({ where: { id, deletedAt: IsNull() } });
    if (!url || url.userId !== userId) throw new ForbiddenException('Acesso negado');
    url.deletedAt = new Date();
    return this.urlRepo.save(url);
  }
}
