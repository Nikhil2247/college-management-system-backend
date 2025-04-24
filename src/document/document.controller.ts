import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import * as multer from 'multer';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('studentId') studentId: string,
    @Body('type') type: string
  ) {
    return this.documentService.uploadDocument(studentId, file, type);
  }

  @Get('student/:studentId')
  async getByStudent(@Param('studentId') studentId: string) {
    return this.documentService.getDocumentsByStudent(studentId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.documentService.deleteDocument(id);
  }
}
