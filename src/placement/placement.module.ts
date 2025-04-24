import { Module } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';

@Module({
  providers: [PlacementService],
  controllers: [PlacementController]
})
export class PlacementModule {}
