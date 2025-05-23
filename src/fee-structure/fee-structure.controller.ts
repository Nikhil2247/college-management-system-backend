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
import { Roles } from 'src/auth/roles.decorator';

@Controller('fee-structure')
export class FeeStructureController {
  constructor(private readonly feeStructureService: FeeStructureService) {}

  @Post()
  //@Roles('ACCOUNTANT', 'PRINCIPAL','TEACHER')
  create(@Body() body: any) {
    return this.feeStructureService.create(body);
  }

  @Get()
  //@Roles('ACCOUNTANT', 'PRINCIPAL','TEACHER')
  findAll() {
    return this.feeStructureService.findAll();
  }

  @Get(':id')
    //@Roles('ACCOUNTANT', 'PRINCIPAL','TEACHER')
  findOne(@Param('id') id: string) {
    return this.feeStructureService.findOne(id);
  }

  @Put(':id')
    //@Roles('ACCOUNTANT', 'PRINCIPAL','TEACHER')
  update(@Param('id') id: string, @Body() body: any) {
    return this.feeStructureService.update(id, body);
  }

  @Delete(':id')
  @Roles('ACCOUNTANT', 'PRINCIPAL','TEACHER')
  remove(@Param('id') id: string) {
    return this.feeStructureService.remove(id);
  }
  @Post(':id/assign-students')
  @Roles('ACCOUNTANT', 'PRINCIPAL','TEACHER')
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
