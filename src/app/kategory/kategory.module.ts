import { Module } from '@nestjs/common';
import { KategoryService } from './kategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kategori } from './katgory.entity';
import { KategoriController } from './kategory.controller';
import { User } from '../auth/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kategori, User])],
  controllers: [KategoriController],
  providers: [KategoryService],
})
export class KategoryModule {}
