import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { FeeService } from './fee.service';

@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post()
  create(@Body() body: any) {
    return this.feeService.createFee(body);
  }

  @Get()
  getAll() {
    return this.feeService.getAllFees();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.feeService.getFeeById(id);
  }

  @Get('student/:studentId')
  getByStudent(@Param('studentId') studentId: string) {
    return this.feeService.getFeesByStudent(studentId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.feeService.updateFee(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.feeService.deleteFee(id);
  }
}
