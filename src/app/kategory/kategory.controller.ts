import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { KategoryService } from './kategory.service';
import {
  CreateKategoriDto,
  UpdateKategoriDto,
  findAllKategori,
} from './kategory.dto';
import { JwtGuard } from '../auth/auth.guard';
import { Pagination } from 'src/utils/decorator/pagination.decorator';
import { CreatedBy } from 'src/utils/decorator/inject-created_by.decorator';
import { UpdatedBy } from 'src/utils/decorator/inject-updated_by.decorator';
import { ResponseSuccess } from 'src/interface';

@UseGuards(JwtGuard) //  implementasikan global guard pada semua endpont kategori memerlukan authentikasi saat request
@Controller('kategori')
export class KategoriController {
  constructor(private kategoriService: KategoryService) {}

  @Post('create')
  async create(@CreatedBy() payload: CreateKategoriDto) {
    return this.kategoriService.create(payload);
  }

  @Get('list')
  async getAllCategory(@Pagination() query: findAllKategori) {
    //gunakan custom decorator yang pernah kita buat
    return this.kategoriService.getAllCategory(query);
  }

  @Get('detail/:id')
  async getDetailKategori(@Param('id') id: string) {
    return this.kategoriService.detailKategori(Number(id));
  }

  @Put('update/:id')
  async updateKategori(
    @Param('id') id: string,
    @UpdatedBy() payload: UpdateKategoriDto
  ): Promise<ResponseSuccess> {
    const result = await this.kategoriService.updateKategori(
      Number(id),
      payload
    );
    return result;
  }
}
