import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { PlacementService } from './placement.service';

@Controller('placements')
export class PlacementController {
  constructor(private readonly placementService: PlacementService) {}

  @Post()
  create(@Body() body: any) {
    return this.placementService.createPlacement(body);
  }

  @Get()
  getAll() {
    return this.placementService.getAllPlacements();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.placementService.getPlacementById(id);
  }

  @Get('student/:studentId')
  getByStudent(@Param('studentId') studentId: string) {
    return this.placementService.getPlacementsByStudent(studentId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.placementService.updatePlacement(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.placementService.deletePlacement(id);
  }
}
