import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer.service';
import { AppService } from 'src/app.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLendingVaultDto } from './dto/create-lending-vault.dto';
import { UpdateLendingVaultDto } from './dto/update-lending-vault.dto';
import { Events } from './entities/events.dto';
import { LendingDeposit } from './entities/lending-deposit.dto';
import { LendingWithdraw } from './entities/lending-withdraw.dto';

@Injectable()
export class LendingVaultService implements OnModuleInit {
  constructor(
    @InjectRepository(Events)
    private EventsRepository: Repository<Events>,
    private readonly consumerService: ConsumerService
  ) { }

  async onModuleInit() {
    await this.consumerService.comsume({ topics: ['lending-deposit-insert', 'lending-withdraw-insert'], fromBeginning: true }, {
      eachMessage: async ({ topic, partition, message }) => {
        if (topic == 'lending-deposit-insert') {
          this.lendingDepositCreate(JSON.parse(message.value.toString()))
        } else if (topic == 'lending-withdraw-insert') {
          this.lendingWithdrawCreate(JSON.parse(message.value.toString()))
        }
      }
    })
  }

  lendingDepositCreate(createDto: CreateLendingVaultDto) {
    const { eventID, timestamp, type, specificationVersion, data } = createDto;
    const eventsEntity = new Events();
    eventsEntity.event_id = eventID;
    eventsEntity.timestamp = AppService.convertToMySQLDateTime(timestamp);
    eventsEntity.type = type;
    eventsEntity.specification_ver = specificationVersion;

    const childEntity = new LendingDeposit();
    childEntity.data_hash = data.hash;
    childEntity.to_address = data.toAddress;
    childEntity.from_address = data.fromAddress;
    childEntity.unix_timestamp = data.unixTimestamp;
    childEntity.owner_address = data.ownerAddress;
    childEntity.amount = AppService.ethToWei(AppService.extractEthAmount(data.amountDeposited)).toString();
    eventsEntity.lending_deposit = [childEntity];

    return this.EventsRepository.save(eventsEntity).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  lendingWithdrawCreate(createDto: CreateLendingVaultDto) {
    const { eventID, timestamp, type, specificationVersion, data } = createDto;
    const eventsEntity = new Events();
    eventsEntity.event_id = eventID;
    eventsEntity.timestamp = AppService.convertToMySQLDateTime(timestamp);
    eventsEntity.type = type;
    eventsEntity.specification_ver = specificationVersion;

    const childEntity = new LendingWithdraw();
    childEntity.data_hash = data.hash;
    childEntity.to_address = data.toAddress;
    childEntity.from_address = data.fromAddress;
    childEntity.unix_timestamp = data.unixTimestamp;
    childEntity.owner_address = data.ownerAddress;
    childEntity.amount = AppService.ethToWei(AppService.extractEthAmount(data.amountDeposited)).toString();
    eventsEntity.lending_withdraw = [childEntity];

    return this.EventsRepository.save(eventsEntity).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async findAll() {
    const dataResult = await this.EventsRepository.find();
    return dataResult;
  }

}
