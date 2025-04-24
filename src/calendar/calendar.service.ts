// === calendar.service.ts ===
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.calendar.create({ data });
  }

  findAll() {
    return this.prisma.calendar.findMany({
      orderBy: { startDate: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.calendar.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.calendar.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.calendar.delete({ where: { id } });
  }
}