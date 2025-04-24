import {
  Controller,
  Put,
  Req,
  Body,
  UseGuards,
  Param,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('students')
@UseGuards(RolesGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Put('update/self/:id')
  //@Roles('STUDENT')
  updateSelf(@Param('id') userId: string, @Body() body: any) {
    return this.studentService.updateStudent(userId, body);
  }

  @Put('update-student/:id')
  @Roles('ADMISSION_OFFICER')
  async updateStudentByAdmin(
    @Param('id') studentId: string,
    @Body() body: any,
  ) {
    return this.studentService.updateStudentByAdmin(studentId, body);
  }

  @Get()
  findAll() {
    return this.studentService.findAllStudents();
  }

 @Post('create')

  @UseInterceptors(FileInterceptor('profileImage'))
  async create(
    @Body() data: any,
    @UploadedFile() profileImage?: Express.Multer.File,
  ) {
    return this.studentService.createStudent(data, profileImage);
  }
}
