import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';

import { ProducerService } from 'src/kafka/producer.service';
import { LendingVaultService } from './lending-vault.service';
import { CreateLendingVaultDto } from './dto/create-lending-vault.dto';
import { UpdateLendingVaultDto } from './dto/update-lending-vault.dto';

@Controller('lending')
export class LendingVaultController {
  constructor(private readonly LendingVaultService: LendingVaultService, private readonly producerService: ProducerService) { }

  @Post('deposit-insert')
  async depositCreate(@Body(ValidationPipe) CreateLendingVaultDto: CreateLendingVaultDto) {
    await this.producerService.produce({
      topic: 'lending-deposit-insert',
      messages: [{
        key: CreateLendingVaultDto.eventID.toString(),
        value: JSON.stringify(CreateLendingVaultDto)
      }]
    },)
  }

  @Post('withdraw-insert')
  async withdrawCreate(@Body(ValidationPipe) CreateLendingVaultDto: CreateLendingVaultDto) {
    await this.producerService.produce({
      topic: 'lending-withdraw-insert',
      messages: [{
        key: CreateLendingVaultDto.eventID.toString(),
        value: JSON.stringify(CreateLendingVaultDto)
      }]
    },)
  }

  @Get('list')
  findAll() {
    return this.LendingVaultService.findAll();
  }
}
