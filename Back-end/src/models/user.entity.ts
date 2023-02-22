import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { IsOptional, IsString } from 'class-validator';
import { propOption } from 'src/toolkit/model.constant';
import { BaseEntity } from './base.entity';

export class UserInfoEntity extends BaseEntity {
  @ApiProperty({ description: '고객명' })
  @IsOptional()
  @IsString()
  @prop(propOption.string.required)
  public name: string;

  @ApiProperty({ description: '그룹명' })
  @IsOptional()
  @IsString()
  @prop(propOption.string.required)
  public groupName: string;
}
