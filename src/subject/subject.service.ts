
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.subject.create({ data });
  }

  findAll() {
    return this.prisma.subject.findMany({
      include: { examResults: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
      include: { examResults: true },
    });
    if (!subject) throw new NotFoundException(`Subject with id ${id} not found`);
    return subject;
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.subject.update({ where: { id }, data: data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.subject.delete({ where: { id } });
  }

  /**
   * Bulk import subjects from an Excel file
   */
  async bulkUpload(file: Express.Multer.File): Promise<{ count: number }> {
    // use xlsx to parse
    const XLSX = require('xlsx');
    const wb = XLSX.read(file.buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(ws, { raw: true });

    // map to Prisma data
    const data = rows.map(row => ({
      syllabusYear: Number(row['syllabusYear']),
      semesterNumber: row['semesterNumber'] ? String(row['semesterNumber']) : null,
      branchName: String(row['branchName']),
      subjectName: String(row['subjectName']),
      subjectCode: String(row['subjectCode']),
      maxMarks: Number(row['maxMarks']),
      subjectType: String(row['subjectType']),
    }));

    // bulk insert, skip duplicates
    const result = await this.prisma.subject.createMany({
      data,
    });
    return { count: result.count };
  }
}


