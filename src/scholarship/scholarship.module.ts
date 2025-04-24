import { Module } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { ScholarshipController } from './scholarship.controller';

@Module({
  providers: [ScholarshipService],
  controllers: [ScholarshipController]
})
export class ScholarshipModule {}
