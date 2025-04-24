import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PlacementService {
  constructor(private prisma: PrismaService) {}

  async createPlacement(data: {
    studentId: string;
    companyName: string;
    jobRole: string;
    salary?: number;
    offerDate: Date;
    status?: 'OFFERED' | 'ACCEPTED' | 'REJECTED' | 'JOINED';
  }) {
    return this.prisma.placement.create({ data });
  }

  async getAllPlacements() {
    return this.prisma.placement.findMany({
      orderBy: { offerDate: 'desc' },
    });
  }

  async getPlacementById(id: string) {
    const placement = await this.prisma.placement.findUnique({
      where: { id },
    });

    if (!placement) throw new NotFoundException('Placement not found');
    return placement;
  }

  async getPlacementsByStudent(studentId: string) {
    return this.prisma.placement.findMany({
      where: { studentId },
      orderBy: { offerDate: 'desc' },
    });
  }

  async updatePlacement(id: string, data: any) {
    return this.prisma.placement.update({
      where: { id },
      data,
    });
  }

  async deletePlacement(id: string) {
    return this.prisma.placement.delete({
      where: { id },
    });
  }
}
