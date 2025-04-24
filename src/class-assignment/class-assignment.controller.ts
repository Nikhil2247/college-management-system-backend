import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClassAssignmentService } from './class-assignment.service';

@Controller('class-assignments')
export class ClassAssignmentController {
  constructor(private readonly classService: ClassAssignmentService) {}

  @Post()
  assign(@Body() body: {
    teacherId: string;
    batchId: string;
    section?: string;
    academicYear?: string;
  }) {
    return this.classService.assignTeacherToBatch(body);
  }

  @Get()
  getAll() {
    return this.classService.getAllAssignments();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.classService.getAssignmentById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.classService.updateAssignment(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classService.deleteAssignment(id);
  }
}
