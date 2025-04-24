import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClassAssignmentService {
  constructor(private prisma: PrismaService) {}

  async assignTeacherToBatch(data: {
    teacherId: string;
    batchId: string;
    section?: string;
    academicYear?: string;
  }) {
    return this.prisma.classAssignment.create({
      data,
    });
  }

  async getAllAssignments() {
    return this.prisma.classAssignment.findMany({
      include: {
        teacher: true,
        Batch: true,
      },
    });
  }

  async getAssignmentById(id: string) {
    const assignment = await this.prisma.classAssignment.findUnique({
      where: { id },
      include: {
        teacher: true,
        Batch: true,
      },
    });

    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async updateAssignment(id: string, data: any) {
    return this.prisma.classAssignment.update({
      where: { id },
      data,
    });
  }

  async deleteAssignment(id: string) {
    return this.prisma.classAssignment.delete({
      where: { id },
    });
  }
}
