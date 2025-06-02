import { ApiProperty } from '@nestjs/swagger';

export class UrlResponseDto {
  @ApiProperty({ example: 'abc123' })
  code: string;

  @ApiProperty({ example: 'https://seusite.com/abc123' })
  shortUrl: string;

  @ApiProperty({ example: 'https://example.com/some-long-url' })
  originalUrl: string;

  @ApiProperty({ example: 'c5172eec-d32e-4ac7-9c44-bb2f09aa104e', nullable: true })
  userId?: string | null;
}