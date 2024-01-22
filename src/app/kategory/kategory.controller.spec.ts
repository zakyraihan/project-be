import { Test, TestingModule } from '@nestjs/testing';
import { KategoryController } from './kategory.controller';

describe('KategoryController', () => {
  let controller: KategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KategoryController],
    }).compile();

    controller = module.get<KategoryController>(KategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
