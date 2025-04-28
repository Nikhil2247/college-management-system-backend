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
  @Roles('STUDENT')
  updateSelf(@Param('id') userId: string, @Body() body: any) {
    return this.studentService.updateStudent(userId, body);
  }

  //@Roles('"ADMIN", "TEACHER", "ADMISSION_OFFICER", "STUDENT"')
  @Put('update-student/:id')
  //@Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER')
  async updateStudentByAdmin(
    @Param('id') studentId: string,
    @Body() body: any,
  ) {
    return this.studentService.updateStudentByAdmin(studentId, body);
  }

  @Get()
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER')
  findAll() {
    return this.studentService.findAllStudents();
  }

  @Post('create')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER')
  @UseInterceptors(FileInterceptor('profileImage'))
  async create(
    @Body() data: any,
    @UploadedFile() profileImage?: Express.Multer.File,
  ) {
    return this.studentService.createStudent(data, profileImage);
  }

  @Get(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER', 'STUDENT')
  async findOne(@Param('id') id: string) {
    const student = await this.studentService.getStudentById(id);
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return student;
  }

  @Get('profile/:id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER', 'STUDENT')
  async findOneByUserId(@Param('id') id: string) {
    const student = await this.studentService.getStudentByUserId(id);
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return student;
  }
}
