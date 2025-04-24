import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';

@Module({
  providers: [SemesterService],
  controllers: [SemesterController]
})
export class SemesterModule {}
