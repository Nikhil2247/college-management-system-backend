import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { SemesterService } from './semester.service';

@Controller('semesters')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post()
  create(@Body() body: { number: number; isActive?: boolean }) {
    return this.semesterService.createSemester(body);
  }

  @Get()
  getAll() {
    return this.semesterService.getAllSemesters();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.semesterService.getSemesterById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.semesterService.updateSemester(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.semesterService.deleteSemester(id);
  }
}
