import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LendingVaultController } from './lending-vault.controller';
import { LendingVaultService } from './lending-vault.service';
import { Events } from './entities/events.dto';
import { LendingDeposit } from './entities/lending-deposit.dto';
import { LendingWithdraw } from './entities/lending-withdraw.dto';


@Module({
  imports: [KafkaModule, TypeOrmModule.forFeature([Events, LendingDeposit, LendingWithdraw])],
  controllers: [LendingVaultController],
  providers: [LendingVaultService],
})
export class LendingDepositCommandsModule { }
