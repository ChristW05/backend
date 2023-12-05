import { Test, TestingModule } from '@nestjs/testing';
import { CompagniesController } from './compagnies.controller';

describe('CompagniesController', () => {
  let controller: CompagniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompagniesController],
    }).compile();

    controller = module.get<CompagniesController>(CompagniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
