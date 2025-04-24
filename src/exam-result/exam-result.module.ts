import { Module } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { ExamResultController } from './exam-result.controller';

@Module({
  providers: [ExamResultService],
  controllers: [ExamResultController]
})
export class ExamResultModule {}
