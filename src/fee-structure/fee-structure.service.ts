// fee-structure.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FeeStructureService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const exists = await this.prisma.feeStructure.findFirst({
      where: {
        admissionType: data.admissionType,
        scholarshipScheme: data.scholarshipScheme,
        semesterNumber: data.semesterNumber,
      },
    });
    if (exists) throw new BadRequestException('Fee structure already exists');

    return this.prisma.feeStructure.create({ data });
  }

  async findAll() {
    return this.prisma.feeStructure.findMany({
      orderBy: { semesterNumber: 'asc' },
    });
  }

  async findOne(id: string) {
    const feeStructure = await this.prisma.feeStructure.findUnique({
      where: { id },
    });
    if (!feeStructure) throw new NotFoundException('Fee structure not found');
    return feeStructure;
  }

  async update(id: string, data: any) {
    await this.findOne(id); // Validate exists
    return this.prisma.feeStructure.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id); // Validate exists
    return this.prisma.feeStructure.delete({ where: { id } });
  }

  async assignStudentsToScholarship(
    feeStuctureId: string,
    studentIds: string[],
  ) {
    // Check if the scholarship exists
    const FeeStructure = await this.prisma.feeStructure.findUnique({
      where: { id: feeStuctureId },
    });

    if (!FeeStructure) {
      throw new NotFoundException('FeeStructure not found');
    }

    // Update each student with the scholarshipId
    const updatePromises = studentIds.map((studentId) =>
      this.prisma.student.update({
        where: { id: studentId },
        data: { feeStuctureId },
      }),
    );

    await Promise.all(updatePromises);

    return {
      message: `${studentIds.length} student(s) assigned to scholarship.`,
      feeStuctureId,
      studentIds,
    };
  }

  
}