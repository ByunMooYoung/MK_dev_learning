import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthToken {
  @ApiProperty({ description: '사용자 ObjectID' })
  @IsString()
  public uID: string;

  @ApiProperty({ description: '그룹 ObjectID' })
  @IsString()
  public gID?: string;

  @ApiProperty({ description: '사용자명' })
  @IsString()
  public uName: string;
}

export class UserSignInInfo {
  @ApiProperty({ description: '로그인 ID' })
  @IsString()
  public userId: string;

  @ApiProperty({ description: '로그인 PW' })
  @IsString()
  public userPwd: string;
}

export class ChangePWD {
  @ApiProperty({ description: '사용자의 ObjectID' })
  @IsString()
  public _id: string;

  @ApiProperty({ description: '기존 비밀번호' })
  @IsString()
  public oldPWD: string;

  @ApiProperty({ description: '신규 비밀번호' })
  @IsString()
  public newPWD: string;
}
