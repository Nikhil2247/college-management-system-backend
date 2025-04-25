import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Roles } from 'src/auth/roles.decorator';

@Injectable()
export class FeeService {
  constructor(private prisma: PrismaService) {}

  async createFee(data: {
    studentId: string;
    semesterId: string;
    feeStructureId: string;
    amountDue: number;
    amountPaid?: number;
    dueDate: string;
    status: 'PAID' | 'PARTIAL' | 'PENDING' | 'WAIVED';
  }) {
    return this.prisma.fee.create({ data });
  }

  //@Roles('"TEACHER", "ADMISSION_OFFICER"')
  async getAllFees() {
    return this.prisma.fee.findMany({
      include: {
        Student: true,
        Semester: true,
        FeeStructure: true,
      },
    });
  }

  async getFeeById(id: string) {
    const fee = await this.prisma.fee.findUnique({
      where: { id },
      include: { Student: true, Semester: true },
    });

    if (!fee) throw new NotFoundException('Fee record not found');
    return fee;
  }

  async updateFee(id: string, data: any) {
    return this.prisma.fee.update({
      where: { id },
      data,
    });
  }

  async deleteFee(id: string) {
    return this.prisma.fee.delete({
      where: { id },
    });
  }

  async getFeesByStudent(studentId: string) {
    return this.prisma.fee.findMany({
      where: { studentId },
      include: { Semester: true },
    });
  }
}
