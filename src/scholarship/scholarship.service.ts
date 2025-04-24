import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ScholarshipService {
  constructor(private prisma: PrismaService) {}

  async createScholarship(data: {
    studentId: string;
    type: 'CMS50' | 'CMS60' | 'CMS70' | 'CMS80' | 'CMS90' | 'PMS' | 'FWS';
    amount: number;
    status?: 'APPROVED' | 'REJECTED' | 'DISBURSED';
  }) {
    return this.prisma.scholarship.create({ data });
  }

  async getAllScholarships() {
    return this.prisma.scholarship.findMany({
      include: { students: true },
    });
  }

  async getScholarshipById(id: string) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id },
      include: { students: true },
    });

    if (!scholarship) throw new NotFoundException('Scholarship not found');
    return scholarship;
  }

  async updateScholarship(id: string, data: any) {
    return this.prisma.scholarship.update({
      where: { id },
      data,
    });
  }

  async deleteScholarship(id: string) {
    return this.prisma.scholarship.delete({
      where: { id },
    });
  }

  async assignStudentsToScholarship(
    scholarshipId: string,
    studentIds: string[],
  ) {
    // Check if the scholarship exists
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });

    if (!scholarship) {
      throw new NotFoundException('Scholarship not found');
    }

    // Update each student with the scholarshipId
    const updatePromises = studentIds.map((studentId) =>
      this.prisma.student.update({
        where: { id: studentId },
        data: { scholarshipId },
      }),
    );

    await Promise.all(updatePromises);

    return {
      message: `${studentIds.length} student(s) assigned to scholarship.`,
      scholarshipId,
      studentIds,
    };
  }
}
