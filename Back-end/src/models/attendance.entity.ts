import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { propOption } from 'src/toolkit/model.constants';

import { BaseEntity } from './base.entity';

export class Location {
  @ApiProperty({ description: '좌표', type: [Number] })
  @prop({ type: [Number], required: true, _id: false })
  @IsArray()
  @ArrayMinSize(2)
  coordinates: number[];
}

export class ReqPatchPunch {
  @ApiProperty({
    description: '년월',
  })
  @IsOptional()
  @prop({ type: String })
  date: string;

  @ApiProperty({
    description: '시간',
  })
  @IsDateString()
  @IsOptional()
  @prop({ type: Date })
  time: Date;

  @ApiProperty({ type: () => Location })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Location)
  public location: Location;
}

export class AttendanceItem {
  @ApiProperty({ description: '해당 년 + 월 + 일' })
  @IsOptional()
  @prop({ type: () => String })
  @IsString()
  date: string;

  @ApiProperty({
    description: '출근 시간',
  })
  @IsOptional()
  @IsString()
  @prop({ type: () => String })
  punchIn?: string;

  @ApiProperty({
    description: '퇴근 시간',
  })
  @IsOptional()
  @IsString()
  @prop({ type: () => String })
  punchOut?: string;

  @ApiProperty({
    description: '출근 위도 경도 배열',
  })
  @ValidateNested({ each: true })
  @prop({ type: () => Location, _id: false })
  @Type(() => Location)
  public inLocation?: Location;

  @ApiProperty({
    description: '퇴근 위도 경도 배열',
  })
  @ValidateNested({ each: true })
  @prop({ type: () => Location, _id: false })
  @Type(() => Location)
  public outLocation?: Location;

  @ApiProperty({ description: '사유' })
  @IsOptional()
  @IsString()
  @prop({ type: () => String })
  personalReason?: string;
}

export class Attendance extends BaseEntity {
  @ApiProperty({ description: '해당년월' })
  @IsOptional()
  @prop({ type: () => String })
  public date: string;

  @ApiProperty({
    description: '해당 월의 매일 근태 정보',
    type: AttendanceItem,
  })
  @IsOptional()
  @prop({ type: () => [AttendanceItem], required: true, _id: false })
  @Type(() => AttendanceItem)
  items: AttendanceItem[];
}

/********************
 * 1. Req용 class
 *******************/

export class ReqPostAttendance {
  @ApiProperty({ description: '해당 월 + 일' })
  @IsOptional()
  @IsString()
  @prop({ type: () => String })
  date: string;
}
