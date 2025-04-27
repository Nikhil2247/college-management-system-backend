import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Roles } from 'src/auth/roles.decorator';

@Controller('batches')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL','ACCOUNTANT')
  create(@Body() body: { name: string; isActive?: boolean }) {
    return this.batchService.createBatch(body);
  }

  @Get()
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL','ACCOUNTANT')
  findAll() {
    return this.batchService.findAllBatches();
  }

  @Get(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL','ACCOUNTANT')
  findOne(@Param('id') id: string) {
    return this.batchService.findBatchById(id);
  }

  @Put(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL','ACCOUNTANT')
  update(@Param('id') id: string, @Body() body: any) {
    return this.batchService.updateBatch(id, body);
  }

  @Delete(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL','ACCOUNTANT')
  remove(@Param('id') id: string) {
    return this.batchService.deleteBatch(id);
  }
}
