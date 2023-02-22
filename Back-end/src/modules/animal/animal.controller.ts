import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimalService } from './animal.service';

@ApiTags('TEST : 동물 API')
@Controller('api/animal')
export class AnimalController {
  constructor(private readonly service: AnimalService) {}

  @Get('/all')
  @ApiOperation({
    summary: 'Test : 모든 animal 불러오기',
  })
  @ApiResponse({ type: String })
  async findAll(): Promise<String> {
    return await this.service.findAnimalAll();
  }
  @Get('/twoFoot/:name')
  @ApiOperation({
    summary: 'Test : 두다리인 name, animal 불러오기',
  })
  @ApiResponse({ type: String })
  async findTwofeetByOption(@Param('name') name: string): Promise<String> {
    return await this.service.findAnimalTwoFeet(name);
  }
  @Get('/fourFoot/:name')
  @ApiOperation({
    summary: 'Test : 네다리인 name , animal 불러오기',
  })
  @ApiResponse({ type: String })
  async findfourFeet(@Param('name') name: string): Promise<String> {
    return await this.service.findAnimalFourFeet(name);
  }
  @Post('/twoFoot/:name')
  @ApiOperation({
    summary: 'Test : 두다리인 name, animal 생성',
  })
  @ApiResponse({ type: String })
  async createTwofeet(@Param('name') name: string): Promise<String> {
    return await this.service.createAnimalTwoFeet(name);
  }
  @Post('/fourFoot/:name')
  @ApiOperation({
    summary: 'Test : 네다리인 name, animal 생성',
  })
  @ApiResponse({ type: String })
  async createfourFeet(@Param('name') name: string): Promise<String> {
    return await this.service.createAnimalFourFeet(name);
  }
}
