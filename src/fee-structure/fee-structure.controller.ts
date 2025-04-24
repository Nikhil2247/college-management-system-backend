// fee-structure.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FeeStructureService } from './fee-structure.service';

@Controller('fee-structure')
export class FeeStructureController {
  constructor(private readonly feeStructureService: FeeStructureService) {}

  @Post()
  create(@Body() body: any) {
    return this.feeStructureService.create(body);
  }

  @Get()
  findAll() {
    return this.feeStructureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feeStructureService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.feeStructureService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feeStructureService.remove(id);
  }
  @Post(':id/assign-students')
  async assignStudentsToScholarship(
    @Param('id') scholarshipId: string,
    @Body() body: { studentIds: string[] },
  ) {
    return this.feeStructureService.assignStudentsToScholarship(
      scholarshipId,
      body.studentIds,
    );
  }
}
