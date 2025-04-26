import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClassAssignmentService } from './class-assignment.service';
import { Roles } from 'src/auth/roles.decorator';

@Controller('class-assignments')
export class ClassAssignmentController {
  constructor(private readonly classService: ClassAssignmentService) {}

  @Post()
  @Roles('PRINCIPAL')
  assign(
    @Body()
    body: {
      teacherId: string;
      batchId: string;
      section?: string;
      academicYear?: string;
    },
  ) {
    return this.classService.assignTeacherToBatch(body);
  }

  @Get()
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER')
  getAll() {
    return this.classService.getAllAssignments();
  }

  @Get(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER')
  getOne(@Param('id') id: string) {
    return this.classService.getAssignmentById(id);
  }

  @Put(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL')
  update(@Param('id') id: string, @Body() body: any) {
    return this.classService.updateAssignment(id, body);
  }

  @Delete(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL')
  delete(@Param('id') id: string) {
    return this.classService.deleteAssignment(id);
  }
}
