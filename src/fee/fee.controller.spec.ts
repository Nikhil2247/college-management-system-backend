import { Test, TestingModule } from '@nestjs/testing';
import { FeeController } from './fee.controller';

describe('FeeController', () => {
  let controller: FeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeeController],
    }).compile();

    controller = module.get<FeeController>(FeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
