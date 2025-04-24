import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ExamResultService } from './exam-result.service';

@Controller('exam-results')
export class ExamResultController {
  constructor(private readonly examService: ExamResultService) {}

  @Post()
  create(@Body() body: any) {
    return this.examService.createResult(body);
  }

  @Get()
  getAll() {
    return this.examService.getAllResults();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.examService.getResultById(id);
  }

  @Get('student/:studentId')
  getByStudent(@Param('studentId') studentId: string) {
    return this.examService.getResultsByStudent(studentId);
  }

  @Get('semester/:semesterId')
  getBySemester(@Param('semesterId') semesterId: string) {
    return this.examService.getResultsBySemester(semesterId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.examService.updateResult(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.examService.deleteResult(id);
  }
}
