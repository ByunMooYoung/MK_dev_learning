import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { defTakeNum, minTakeNum, maxTakeNum } from 'src/toolkit/model.constant';
import {
  getValidNumber,
  getValidPageNumber,
  getValidTakeNumber,
  strToBoolean,
} from 'src/toolkit/model.lib';

/************************************************
 * FindResult: 도큐먼트 조회시 결과 Res용
 ************************************************/
export class FindResult<T> {
  @ApiProperty({ description: '검색 결과' })
  docs?: T[];

  @ApiProperty({ description: '검색 조건에 해당하는 전체 데이터의 수' })
  totalDocs?: number;

  @ApiProperty({ description: '현재 페이지' })
  currentPage?: number;

  @ApiProperty({ description: '마지막 페이지' })
  lastPage?: number;

  @ApiProperty({
    description: '검색 연도',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(2022)
  @Max(2032)
  @Transform(getValidNumber)
  sYear?: number;

  @ApiProperty({
    description: '검색 시작일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sFrom?: Date;

  @ApiProperty({
    description: '검색 종료일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sTo?: Date;
}
/************************************************
 * BaseEntity: 모든 모델의 베이스가 되는 클래스
 ************************************************/
export class BaseEntity {
  @ApiProperty({ description: '오브젝트 ID (자동생성)', required: false })
  _id: string;

  @ApiProperty({
    description: '데이터 작성자의 오브젝트 ID (자동 주입)',
    required: false,
  })
  @prop()
  public _uID: string;
}

/************************************************
 * FindParameters: 도큐먼트 조회시 파라미터들. Req용
 ************************************************/
export class FindParameters {
  @ApiProperty({
    description: '요청 페이지',
    default: 1,
    required: false,
  })
  @IsOptional()
  @Transform(getValidPageNumber)
  page?: number = 1;

  @ApiProperty({
    description: '페이지당 결과 수, 1 ~ 100 사이의 정수',
    default: defTakeNum,
    minimum: minTakeNum,
    maximum: maxTakeNum,
    required: false,
  })
  @IsOptional()
  @Transform(getValidTakeNumber)
  take?: number = defTakeNum;

  @ApiProperty({ description: '검색 조건 필드', required: false })
  @IsOptional()
  filterKey?: string;

  @ApiProperty({ description: '검색어', required: false })
  @IsOptional()
  filterValue?: string;

  @ApiProperty({
    description: '검색어 포함 정규식 사용 여부',
    default: false,
    required: false,
  })
  @IsOptional()
  @Transform(strToBoolean)
  useRegSearch?: boolean = false;

  /** 검색 기간 조건 */
  // Back-end 전용. 기간 검색 사용 여부
  useDurationSearch?: boolean;

  @ApiProperty({
    description: '검색 시작일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sFrom?: Date;

  @ApiProperty({
    description: '검색 종료일. 2022-02-14 형식',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  sTo?: Date;

  @ApiProperty({
    description: '검색 연도. 검색 시작일과 종료일 값이 없을 때만 동작',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(2022)
  @Max(2032)
  @Transform(getValidNumber)
  sYear?: number;

  // Back-end 전용. 내부 필요로 활용
  filter?: any = null;

  // Sort 옵션
  sortOption?: any = null;
}
/************************************************
 * OptionalInfo: Post나 Patch시 전달할 정보
 ************************************************/
export class BaseReqParams {
  @ApiProperty({ description: 'string 값을 가지는 파라미터' })
  @IsOptional()
  @IsString()
  public strParam?: string;

  @ApiProperty({ description: 'number 값을 가지는 파라미터' })
  @IsOptional()
  @IsNumber()
  public numParam?: number;
}

export class DateTimeReqQuery {
  @ApiProperty({ description: '조회할 날짜' })
  @IsOptional()
  @IsString()
  public date?: string;
}
