import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AnimalService {
  async findAnimalAll() {
    return await 'return all animal';
  }
  async findAnimalTwoFeet(name: string): Promise<String> {
    const naming = name;
    if (naming === '4legs') {
      throw new BadRequestException('It is not two legs');
    }

    return `get two feet animal which name is ${naming}`;
  }
  async findAnimalFourFeet(name: string): Promise<String> {
    const naming = name;
    return `get four feet animal which name is ${naming}`;
  }
  async createAnimalTwoFeet(name: string): Promise<String> {
    const naming = name;
    return `create two feet animal which name is ${naming}`;
  }
  async createAnimalFourFeet(name: string): Promise<String> {
    const naming = name;
    return `create four feet animal which name is ${naming}`;
  }
}
