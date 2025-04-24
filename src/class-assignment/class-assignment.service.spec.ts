import { Test, TestingModule } from '@nestjs/testing';
import { ClassAssignmentService } from './class-assignment.service';

describe('ClassAssignmentService', () => {
  let service: ClassAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassAssignmentService],
    }).compile();

    service = module.get<ClassAssignmentService>(ClassAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
