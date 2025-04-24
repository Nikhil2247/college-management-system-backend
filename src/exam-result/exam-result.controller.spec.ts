import { Test, TestingModule } from '@nestjs/testing';
import { ExamResultController } from './exam-result.controller';

describe('ExamResultController', () => {
  let controller: ExamResultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamResultController],
    }).compile();

    controller = module.get<ExamResultController>(ExamResultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
