import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindParameters, FindResult } from 'src/models/base.entity';

import { AttendanceService } from './attendance.service';

@ApiTags('근태 관리용 api')
@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Get()
  @ApiOperation({ summary: '해당 월의 근태 불러오기 (filterkey,value)' })
  @ApiResponse({ type: FindResult })
  async findByOptions(@Query() fParams: FindParameters): Promise<String> {
    return await this.service.getAttendance(fParams);
  }
}
