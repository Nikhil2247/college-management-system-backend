import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NoticeService {
    constructor(private readonly prisma: PrismaService) {}
    
      create(data: any) {
        return this.prisma.notice.create({ data });
      }
    
      findAll() {
        return this.prisma.notice.findMany({
          orderBy: { createdAt: 'asc' },
        });
      }
    
      findOne(id: string) {
        return this.prisma.notice.findUnique({ where: { id } });
      }
    
      update(id: string, data: any) {
        return this.prisma.notice.update({ where: { id }, data });
      }
    
      remove(id: string) {
        return this.prisma.notice.delete({ where: { id } });
      }
}
