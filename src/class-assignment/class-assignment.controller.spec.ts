import { Test, TestingModule } from '@nestjs/testing';
import { ClassAssignmentController } from './class-assignment.controller';

describe('ClassAssignmentController', () => {
  let controller: ClassAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassAssignmentController],
    }).compile();

    controller = module.get<ClassAssignmentController>(ClassAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
