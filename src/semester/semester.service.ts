import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SemesterService {
  constructor(private prisma: PrismaService) {}

  async createSemester(data: { number: number; isActive?: boolean }) {
    return this.prisma.semester.create({ data });
  }

  async getAllSemesters() {
    return this.prisma.semester.findMany({
      orderBy: { number: 'asc' },
    });
  }

  async getSemesterById(id: string) {
    const semester = await this.prisma.semester.findUnique({
      where: { id },
    });

    if (!semester) throw new NotFoundException('Semester not found');
    return semester;
  }

  async updateSemester(id: string, data: any) {
    return this.prisma.semester.update({
      where: { id },
      data,
    });
  }

  async deleteSemester(id: string) {
    return this.prisma.semester.delete({
      where: { id },
    });
  }
}
