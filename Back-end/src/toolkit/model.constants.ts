/*************************************************
 * mongoose @prop 관련 상수들
 *************************************************/

import {
  PropOptionsForNumber,
  PropOptionsForString,
} from '@typegoose/typegoose/lib/types';

// string 관련 prop options
const strDef: PropOptionsForString = {
  trim: true,
};
const strRequired: PropOptionsForString = {
  ...strDef,
  required: true,
};

const strUnique: PropOptionsForString = {
  ...strDef,
  unique: true,
};

const strUniqueAndRequired: PropOptionsForString = {
  ...strDef,
  required: true,
  unique: true,
};

// boolean 관련
const boolTrue: PropOptionsForString = {
  required: true,
  default: true,
};

const boolFalse: PropOptionsForString = {
  required: true,
  default: false,
};

// number 관련
const numDef: PropOptionsForNumber = {
  default: 0,
};

const numRequired: PropOptionsForNumber = {
  ...numDef,
  required: true,
};

const numUnique: PropOptionsForNumber = {
  ...numDef,
  unique: true,
};

const numUniqueAndRequired: PropOptionsForNumber = {
  ...numDef,
  unique: true,
  required: true,
};

// date 관련
const dateDef: PropOptionsForString = {
  default: Date.now(),
};

const dateRequired: PropOptionsForString = {
  ...dateDef,
  required: true,
};

export const propOption = {
  string: {
    def: strDef,
    required: strRequired,
    unique: strUnique,
    uniqueAndRequired: strUniqueAndRequired,
  },
  boolean: {
    true: boolTrue,
    false: boolFalse,
  },
  number: {
    def: numDef,
    required: numRequired,
    unique: numUnique,
    uniqueAndRequired: numUniqueAndRequired,
  },
  date: {
    def: dateDef,
    required: dateRequired,
  },
};
