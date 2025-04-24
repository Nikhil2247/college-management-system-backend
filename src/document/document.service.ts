import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { DocumentType } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService
  ) {}

  async uploadDocument(
    studentId: string,
    file: Express.Multer.File,
    type: string
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const cloudinaryResult = await this.cloudinaryService.uploadFile(file, 'student-documents');

    return this.prisma.document.create({
      data: {
        studentId,
         type: type as DocumentType,
        fileName: file.originalname,
        fileUrl: cloudinaryResult.secure_url,
      },
    });
  }

  async getDocumentsByStudent(studentId: string) {
    return this.prisma.document.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteDocument(id: string) {
    const document = await this.prisma.document.findUnique({ where: { id } });

    if (!document) {
      throw new BadRequestException('Document not found');
    }

    const publicId = this.cloudinaryService.getPublicIdFromUrl(document.fileUrl);
    await this.cloudinaryService.deleteFile(publicId);

    return this.prisma.document.delete({ where: { id } });
  }
}
