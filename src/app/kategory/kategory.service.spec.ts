import { Test, TestingModule } from '@nestjs/testing';
import { KategoryService } from './kategory.service';

describe('KategoryService', () => {
  let service: KategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KategoryService],
    }).compile();

    service = module.get<KategoryService>(KategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
