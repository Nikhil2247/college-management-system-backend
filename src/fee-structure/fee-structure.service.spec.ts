import { Test, TestingModule } from '@nestjs/testing';
import { FeeStructureService } from './fee-structure.service';

describe('FeeStructureService', () => {
  let service: FeeStructureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeeStructureService],
    }).compile();

    service = module.get<FeeStructureService>(FeeStructureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
