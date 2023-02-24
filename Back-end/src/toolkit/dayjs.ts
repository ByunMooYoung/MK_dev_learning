import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
import * as duration from 'dayjs/plugin/duration';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { const_config } from 'src/constants/env.constants';

const tZone = 'Asia/Seoul';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.locale('ko');
dayjs.tz.setDefault(tZone);

export const today = (): string => {
  return dayjs().tz().format('YYYYMMDD');
};

export const todaysTime = (): string => {
  return dayjs().tz().format('HH:mm:ss');
};
