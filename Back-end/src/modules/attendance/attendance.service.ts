import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import dayjs from 'dayjs';
import { InjectModel } from 'kindagoose';

import {
  Attendance,
  AttendanceItem,
  ReqPatchPunch,
  ReqPostAttendance,
} from 'src/models/attendance.entity';
import { FindParameters } from 'src/models/base.entity';
import { today, todaysTime } from 'src/toolkit/dayjs';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance) readonly model: ReturnModelType<typeof Attendance>,
  ) {}

  // 해당 월의 근태 관리 페이지
  async getAttendance(fParams: FindParameters) {
    const find = await this.model.findOne(fParams);
    if (!find) {
      const result = this.createNewAttendance(fParams);
      return result;
    }
    return find;
  }
  async createNewAttendance(res: ReqPostAttendance) {
    const find = await this.model.findOne(res);
    if (find) {
      throw new BadRequestException('Already exist');
    }

    const newAttendances: Attendance = new Attendance();
    newAttendances.date = res.date;
    const result = await this.model.create(newAttendances);
    return result;
  }
  // 해당 날짜에 출근 post
  async patchPunchInDailyAttendance(res: ReqPatchPunch) {
    const param = { date: res.date };
    const foundAttendance = await this.model.findOne(param);
    const dailyItem: AttendanceItem = new AttendanceItem();
    if (foundAttendance) {
      const attended = foundAttendance.items.find((arr, idx) => {
        if ((arr.date = today())) {
          foundAttendance.items[idx].date = today();
          foundAttendance.items[idx].punchIn = todaysTime();
          foundAttendance.items[idx].inLocation = res.location;
          return true;
        }
      });
      if (!attended) {
        dailyItem.date = today();
        dailyItem.punchIn = todaysTime();
        dailyItem.inLocation = res.location;
        foundAttendance.items.push(dailyItem);
      }

      const result = await this.model.findOneAndUpdate(param, foundAttendance);
      console.log('in', result);
      return result;
    } else {
      throw new BadRequestException(`there are no Attendance with ${res.date}`);
    }
  }
  // 해당 날짜에 퇴근 post
  async patchPunchOutDailyAttendance(res: ReqPatchPunch) {
    const param = { date: res.date };
    const foundAttendance = await this.model.findOne(param);
    const dailyItem: AttendanceItem = new AttendanceItem();
    if (foundAttendance) {
      const attended = foundAttendance.items.find((arr, idx) => {
        if ((arr.date = today())) {
          foundAttendance.items[idx].date = today();
          foundAttendance.items[idx].punchOut = todaysTime();
          foundAttendance.items[idx].outLocation = res.location;
          return true;
        }
      });
      if (!attended) {
        dailyItem.date = today();
        dailyItem.punchOut = todaysTime();
        dailyItem.outLocation = res.location;
        foundAttendance.items.push(dailyItem);
      }

      const result = await this.model.findOneAndUpdate(param, foundAttendance);
      console.log('out', result);
      return result;
    } else {
      throw new BadRequestException(`there are no Attendance with ${res.date}`);
    }
  }
  // 해당 날짜의 출,퇴근 시간 Change
  async patchDailyAttendace(res: AttendanceItem) {
    const param = { data: res.date.slice(0, 5) };
    console.log(param);
    // const foundAttendance = await this.model
    return 'can change daily attendance';
  }
}
