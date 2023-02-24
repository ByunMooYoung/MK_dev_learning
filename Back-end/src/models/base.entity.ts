import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsOptional } from 'class-validator';

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
  @ApiProperty({ description: '검색어', required: false })
  @IsOptional()
  date: string;
}
