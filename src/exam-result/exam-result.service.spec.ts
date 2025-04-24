import { Test, TestingModule } from '@nestjs/testing';
import { ExamResultService } from './exam-result.service';

describe('ExamResultService', () => {
  let service: ExamResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamResultService],
    }).compile();

    service = module.get<ExamResultService>(ExamResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
