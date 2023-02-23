import { Injectable } from '@nestjs/common';
import {
  AttendanceItem,
  ReqPatchPunch,
  ReqPostAttendance,
} from 'src/models/attendance.entity';
import { FindParameters } from 'src/models/base.entity';

@Injectable()
export class AttendanceService {
  // 해당 월의 근태 관리 페이지
  async getAttendance(fParams: FindParameters) {
    console.log(fParams);
    return 'get monthly attendance';
  }
  async createNewAttendance(res: ReqPostAttendance) {
    return `create new attendance ${res.date}`;
  }
  // 해당 날짜에 출근 post
  async patchPunchInDailyAttendance(res: ReqPatchPunch) {
    console.log('1', res);
    return `patch ${res.time} punch in}`;
  }
  // 해당 날짜에 퇴근 post
  async patchPunchOutDailyAttendance(res: ReqPatchPunch) {
    console.log('2', res);
    return `patch ${res.time} punch out`;
  }
  // 해당 날짜의 출,퇴근 시간 Change
  async patchDailyAttendace(res: AttendanceItem) {
    console.log('3', res);
    return 'can change daily attendance';
  }
}
