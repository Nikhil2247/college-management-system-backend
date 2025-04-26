import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { FeeService } from './fee.service';
import { Roles } from 'src/auth/roles.decorator';

@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post()
  @Roles('ACCOUNTANT', 'PRINCIPAL')
  create(@Body() body: any) {
    return this.feeService.createFee(body);
  }

  @Get()
  @Roles('ACCOUNTANT', 'PRINCIPAL')
  getAll() {
    return this.feeService.getAllFees();
  }

  @Get(':id')
  @Roles('ADMISSION_OFFICER', 'PRINCIPAL')
  getOne(@Param('id') id: string) {
    return this.feeService.getFeeById(id);
  }

  @Get('student/:studentId')
  @Roles('ACCOUNTANT', 'PRINCIPAL')
  getByStudent(@Param('studentId') studentId: string) {
    return this.feeService.getFeesByStudent(studentId);
  }

  @Put(':id')
  @Roles('ACCOUNTANT', 'PRINCIPAL')
  update(@Param('id') id: string, @Body() body: any) {
    return this.feeService.updateFee(id, body);
  }

  @Delete(':id')
  @Roles('ACCOUNTANT', 'PRINCIPAL')
  delete(@Param('id') id: string) {
    return this.feeService.deleteFee(id);
  }
}
