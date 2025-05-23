// === src/subject/subject.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Roles } from 'src/auth/roles.decorator';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly service: SubjectService) {}

  @Post()
  //@Roles('ADMISSION_OFFICER', 'PRINCIPAL')
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get()
  //@Roles('ADMISSION_OFFICER', 'PRINCIPAL','TEACHER')
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  //@Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  //@Roles('ADMISSION_OFFICER', 'PRINCIPAL', 'TEACHER')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
  @Post('bulk-upload')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(xlsx|xls)$/)) {
          return cb(new BadRequestException('Only Excel files allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  bulkUpload(@UploadedFile() file: Express.Multer.File) {
    return this.service.bulkUpload(file);
  }
}
