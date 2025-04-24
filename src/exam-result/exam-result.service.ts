import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ExamResultService {
  constructor(private prisma: PrismaService) {}

  async createResult(data: {
    studentId: string;
    semesterId: string;
    subjectId: string;
    marks: number;
    maxMarks?: number;
  }) {
    return this.prisma.examResult.create({
      data,
    });
  }

  async getAllResults() {
    return this.prisma.examResult.findMany({
      include: { Student: true, Semester: true, Subject: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getResultById(id: string) {
    const result = await this.prisma.examResult.findUnique({
      where: { id },
      include: { Student: true, Semester: true, Subject: true },
    });

    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  async getResultsByStudent(studentId: string) {
    return this.prisma.examResult.findMany({
      where: { studentId },
      include: { Semester: true, Subject: true },
    });
  }

  async getResultsBySemester(semesterId: string) {
    return this.prisma.examResult.findMany({
      where: { semesterId },
      include: { Student: true, Subject: true },
    });
  }

  async updateResult(id: string, data: any) {
    return this.prisma.examResult.update({
      where: { id },
      data,
    });
  }

  async deleteResult(id: string) {
    return this.prisma.examResult.delete({
      where: { id },
    });
  }
}
