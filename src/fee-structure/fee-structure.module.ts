import { Module } from '@nestjs/common';
import { FeeStructureController } from './fee-structure.controller';
import { FeeStructureService } from './fee-structure.service';

@Module({
  controllers: [FeeStructureController],
  providers: [FeeStructureService]
})
export class FeeStructureModule {}
