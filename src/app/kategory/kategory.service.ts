import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response/base.response';
import { Kategori } from './katgory.entity';
import { Like, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ResponsePagination, ResponseSuccess } from 'src/interface';
import {
  CreateKategoriDto,
  UpdateKategoriDto,
  findAllKategori,
} from './kategory.dto';

@Injectable()
export class KategoryService extends BaseResponse {
  constructor(
    @InjectRepository(Kategori)
    private readonly kategoriRepository: Repository<Kategori>,
    @Inject(REQUEST) private req: any, // inject request agar bisa mengakses req.user.id dari  JWT token pada service
  ) {
    super();
  }

  async create(payload: CreateKategoriDto): Promise<ResponseSuccess> {
    try {
      await this.kategoriRepository.save(payload);

      return this._success('OK', this.req.user.user_id);
    } catch {
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getAllCategory(query: findAllKategori): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama_kategori } = query;

    const filterQuery: any = {};
    if (nama_kategori) {
      filterQuery.nama_kategori = Like(`%${nama_kategori}%`);
    }

    const total = await this.kategoriRepository.count({
      where: filterQuery,
    });

    const result = await this.kategoriRepository.find({
      where: filterQuery,
      relations: ['created_by', 'updated_by'], // relasi yang akan ditampilkan saat menampilkan list kategori
      select: {
        // pilih data mana saja yang akan ditampilkan dari tabel kategori
        id: true,
        nama_kategori: true,
        created_by: {
          id: true, // pilih field  yang akan ditampilkan dari tabel user
          nama: true,
        },
        updated_by: {
          id: true, // pilih field  yang akan ditampilkan dari tabel user
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('oke', result, total, page, pageSize);
  }

  async detailKategori(id: number): Promise<ResponseSuccess> {
    const detailKategori = await this.kategoriRepository.findOne({
      where: {
        id: id,
      },
      relations: ['created_by', 'updated_by'],
      select: {
        id: true,
        nama_kategori: true,
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },
    });

    if (detailKategori === null) {
      throw new NotFoundException(`kategori dengan id ${id} tidak ditemukan`);
    }

    return this._success('success', detailKategori);
  }

  async updateKategori(
    id: number,
    payload: UpdateKategoriDto,
  ): Promise<ResponseSuccess> {
    const kategori = await this.kategoriRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!kategori) {
      throw new NotFoundException(`kategori dengan id ${id} tidak ditemukan`);
    }

    const data = await this.kategoriRepository.save({
      ...payload,
      id: id,
    });

    return this._success('Kategori updated successfully', data);
  }
}
