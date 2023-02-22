import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import { isNumber } from 'class-validator';

/***************************************************
 * FindParameters로 입력 받은 속성 검증용 함수들
 ***************************************************/
export const getValidNumber = (params: TransformFnParams) => {
  params.value = parseInt(params.value);
  return params.value;
};

export const getValidPageNumber = (params: TransformFnParams) => {
  params.value = parseInt(params.value);

  if (!isNumber(params.value)) {
    params.value = 1;
  }
  if (params.value <= 0) {
    params.value = 1;
  }
  return params.value;
};

// 페이지당 출력 문서 수 검증
export const getValidTakeNumber = (params: TransformFnParams) => {
  params.value = parseInt(params.value);

  if (!isNumber(params.value)) {
    params.value = 10;
  }

  if (params.value <= 0) {
    params.value = 10;
  } else if (params.value > 100) {
    params.value = 100;
  }

  return params.value;
};

export const strToBoolean = (params: TransformFnParams) => {
  if (params.value == 'true' || params.value == true) {
    params.value = true;
  } else {
    params.value = false;
  }

  return params.value;
};

export const removePropertyWithEmptyValue = (params: TransformFnParams) => {
  // 빈값 null 처리
  if (
    params.value == '' ||
    params.value == undefined ||
    params.value == 'undefined'
  ) {
    return null;
  }
  return params.value;
};
