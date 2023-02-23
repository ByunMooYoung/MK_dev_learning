import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Attendance,
  AttendanceItem,
  ReqPatchPunch,
  ReqPostAttendance,
} from 'src/models/attendance.entity';
import { FindParameters, FindResult } from 'src/models/base.entity';

import { AttendanceService } from './attendance.service';

@ApiTags('근태 관리용 api')
@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Get()
  @ApiOperation({ summary: '해당 월의 근태 불러오기 (filterkey,value)' })
  @ApiResponse({ type: FindResult })
  async findattendanceByMonth(
    @Query() fParams: FindParameters,
  ): Promise<String> {
    return await this.service.getAttendance(fParams);
  }

  @Post()
  @ApiOperation({ summary: '근태 목록 새로 생성하기' })
  @ApiBody({ type: ReqPostAttendance })
  @ApiCreatedResponse({ type: Attendance<AttendanceItem> })
  async createNewAttendance(@Body() data: ReqPostAttendance): Promise<String> {
    return await this.service.createNewAttendance(data);
  }

  @Patch('/punch/in')
  @ApiOperation({ summary: '해당 날짜에 출근 Patch' })
  @ApiBody({ type: ReqPatchPunch })
  @ApiCreatedResponse({ type: Attendance<AttendanceItem> })
  async patchPunchIn(@Body() data: ReqPatchPunch): Promise<String> {
    return await this.service.patchPunchInDailyAttendance(data);
  }

  @Patch('punch/out')
  @ApiOperation({ summary: '해당 날짜에 퇴근 Patch' })
  @ApiBody({ type: ReqPatchPunch })
  @ApiCreatedResponse({ type: Attendance<AttendanceItem> })
  async patchPunchOut(@Body() data: ReqPatchPunch): Promise<String> {
    return await this.service.patchPunchOutDailyAttendance(data);
  }

  @Patch('punch/all')
  @ApiOperation({ summary: '해당 날짜 Patch' })
  @ApiBody({ type: AttendanceItem })
  @ApiCreatedResponse({ type: Attendance<AttendanceItem> })
  async patchPunchAll(@Body() data: AttendanceItem): Promise<String> {
    return await this.service.patchDailyAttendace(data);
  }
}
