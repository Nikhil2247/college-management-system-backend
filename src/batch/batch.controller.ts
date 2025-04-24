import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller('batches')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  create(@Body() body: { name: string; isActive?: boolean }) {
    return this.batchService.createBatch(body);
  }

  @Get()
  findAll() {
    return this.batchService.findAllBatches();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.batchService.findBatchById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.batchService.updateBatch(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.batchService.deleteBatch(id);
  }
}
