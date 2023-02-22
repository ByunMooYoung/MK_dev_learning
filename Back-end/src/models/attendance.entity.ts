import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { BaseEntity } from './base.entity';

export class Location {
  @ApiProperty({ description: '좌표타입' })
  @prop({ type: String, _id: false })
  @IsString()
  readonly type: string;

  @ApiProperty({ description: '좌표' })
  @prop({ type: [Number], required: true, _id: false })
  @IsArray()
  @ArrayMinSize(2)
  coordinates: number[];
}

export class AttendanceItem {
  @ApiProperty({ description: '해당 월 + 일' })
  @IsOptional()
  @prop({ type: () => Number })
  date?: number;

  @ApiProperty({
    description: '출근 시간',
  })
  @IsOptional()
  @IsDateString()
  @prop({ type: Date })
  punchIn?: Date;

  @ApiProperty({
    description: '퇴근 시간',
  })
  @IsOptional()
  @IsDateString()
  @prop({ type: Date })
  punchOut?: Date;

  @ApiProperty({
    description: '출근 위도 경도 배열',
  })
  @ValidateNested({ each: true })
  @prop({ type: () => Location, _id: false })
  inLocation?: Location;

  @ApiProperty({
    description: '퇴근 위도 경도 배열',
  })
  @ValidateNested({ each: true })
  @prop({ type: () => Location, _id: false })
  outLocation?: Location;

  @ApiProperty({ description: '사유' })
  @IsOptional()
  @IsString()
  personalReason?: string;
}

export class Attendance extends BaseEntity {
  @ApiProperty({ description: '해당 년도 + 월' })
  @prop({ type: () => Number })
  date: number;

  @ApiProperty({ description: '해당 월의 매일 근태 정보' })
  @prop({ type: () => [AttendanceItem], required: true, _id: false })
  items: AttendanceItem[];
}
