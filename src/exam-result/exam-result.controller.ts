import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';
import { Roles } from 'src/auth/roles.decorator';

@Controller('exam-results')
export class ExamResultController {
  constructor(private readonly examService: ExamResultService) {}

  @Post()
  @Roles('EXAMINATION_OFFICER', 'PRINCIPAL')
  create(@Body() body: any) {
    return this.examService.createResult(body);
  }

  @Get()
  @Roles('EXAMINATION_OFFICER', 'PRINCIPAL')
  getAll() {
    return this.examService.getAllResults();
  }

  @Get(':id')
  @Roles('EXAMINATION_OFFICER', 'PRINCIPAL')
  getById(@Param('id') id: string) {
    return this.examService.getResultById(id);
  }

  @Get('student/:studentId')
  @Roles('EXAMINATION_OFFICER', 'PRINCIPAL')
  getByStudent(@Param('studentId') studentId: string) {
    return this.examService.getResultsByStudent(studentId);
  }

  @Get('semester/:semesterId')
  @Roles('EXAMINATION_OFFICER', 'PRINCIPAL')
  getBySemester(@Param('semesterId') semesterId: string) {
    return this.examService.getResultsBySemester(semesterId);
  }

  @Put(':id')
  @Roles('EXAMINATION_OFFICER', 'PRINCIPAL')
  update(@Param('id') id: string, @Body() body: any) {
    return this.examService.updateResult(id, body);
  }

  @Delete(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL')
  delete(@Param('id') id: string) {
    return this.examService.deleteResult(id);
  }
}
