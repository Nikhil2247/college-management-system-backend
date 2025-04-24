import { Test, TestingModule } from '@nestjs/testing';
import { PlacementController } from './placement.controller';

describe('PlacementController', () => {
  let controller: PlacementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacementController],
    }).compile();

    controller = module.get<PlacementController>(PlacementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
