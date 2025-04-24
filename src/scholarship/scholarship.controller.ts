import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';

@Controller('scholarships')
export class ScholarshipController {
  constructor(private readonly scholarshipService: ScholarshipService) {}

  @Post()
  create(@Body() body: any) {
    return this.scholarshipService.createScholarship(body);
  }

  @Get()
  getAll() {
    return this.scholarshipService.getAllScholarships();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.scholarshipService.getScholarshipById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.scholarshipService.updateScholarship(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.scholarshipService.deleteScholarship(id);
  }

  @Post(':id/assign-students')
  async assignStudentsToScholarship(
    @Param('id') scholarshipId: string,
    @Body() body: { studentIds: string[] },
  ) {
    return this.scholarshipService.assignStudentsToScholarship(
      scholarshipId,
      body.studentIds,
    );
  }
}
