import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardTest extends AuthGuard('jwt') {
  constructor(readonly reflector: Reflector) {
    super();
  }
}
