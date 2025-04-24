import { Module } from '@nestjs/common';
import { ClassAssignmentService } from './class-assignment.service';
import { ClassAssignmentController } from './class-assignment.controller';

@Module({
  providers: [ClassAssignmentService],
  controllers: [ClassAssignmentController]
})
export class ClassAssignmentModule {}
