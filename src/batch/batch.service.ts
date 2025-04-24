import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BatchService {
  constructor(private prisma: PrismaService) {}

  async createBatch(data: { name: string; isActive?: boolean }) {
    return this.prisma.batch.create({ data });
  }

  async findAllBatches() {
    return this.prisma.batch.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBatchById(id: string) {
    const batch = await this.prisma.batch.findUnique({
      where: { id },
      include: {
        students: true,
        classAssignments: true,
      },
    });

    if (!batch) throw new NotFoundException('Batch not found');
    return batch;
  }

  async updateBatch(id: string, data: any) {
    return this.prisma.batch.update({
      where: { id },
      data,
    });
  }

  async deleteBatch(id: string) {
    return this.prisma.batch.delete({
      where: { id },
    });
  }
}
