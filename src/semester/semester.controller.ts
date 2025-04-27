import { Controller, Get, Post, Param, Put, Delete, Body } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { Roles } from 'src/auth/roles.decorator';

@Controller('semesters')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post()
 @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER','ACCOUNTANT')
  create(@Body() body: { number: number; isActive?: boolean }) {
    return this.semesterService.createSemester(body);
  }

  @Get()
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER','ACCOUNTANT')
  getAll() {
    return this.semesterService.getAllSemesters();
  }

  @Get(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER','ACCOUNTANT')
  getOne(@Param('id') id: string) {
    return this.semesterService.getSemesterById(id);
  }

  @Put(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER','ACCOUNTANT')
  update(@Param('id') id: string, @Body() body: any) {
    return this.semesterService.updateSemester(id, body);
  }

  @Delete(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER','ACCOUNTANT')
  delete(@Param('id') id: string) {
    return this.semesterService.deleteSemester(id);
  }
}
