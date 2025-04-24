import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';

@Module({
  providers: [FeeService],
  controllers: [FeeController]
})
export class FeeModule {}
