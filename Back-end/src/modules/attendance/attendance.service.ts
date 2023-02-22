import { Injectable } from '@nestjs/common';
import { FindParameters } from 'src/models/base.entity';

@Injectable()
export class AttendanceService {
  // 해당 월의 근태 관리 페이지
  async getAttendance(fParams: FindParameters) {
    console.log('1', fParams);
    return 'get monthly attendance';
  }
  async createNewAttendace() {
    return 'create new attendance';
  }
  // 해당 날짜에 출근 post
  async postPunchInDailyAttendance() {
    return 'posting punch in daily attendance';
  }
  // 해당 날짜에 퇴근 post
  async postPunchOutDailyAttendance() {
    return 'posting punch out daily attendance';
  }
  // 해당 날짜의 출,퇴근 시간 Change
  async patchDailyAttendace() {
    return 'can change daily attendance';
  }
}
