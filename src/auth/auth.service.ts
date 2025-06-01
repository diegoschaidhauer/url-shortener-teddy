import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const exists = await this.userRepo.findOneBy({ email: dto.email });
    if (exists) throw new UnauthorizedException('Email já registrado');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: passwordHash });
    await this.userRepo.save(user);
    return { message: 'Usuário criado com sucesso' };
  }

  async login(dto: CreateUserDto) {
    const user = await this.userRepo.findOneBy({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const token = this.jwtService.sign({ sub: user.id });
    return { access_token: token };
  }

  async findById(id: string) {
    return this.userRepo.findOneBy({ id });
  }
}
