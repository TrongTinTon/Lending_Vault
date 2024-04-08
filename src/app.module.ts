import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LendingDepositCommandsModule } from './lending-vault/lending-vault.module';
import { Events } from './lending-vault/entities/events.dto';
import { LendingDeposit } from './lending-vault/entities/lending-deposit.dto';
import { LendingWithdraw } from './lending-vault/entities/lending-withdraw.dto';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'bank_db',
    entities: [Events, LendingDeposit, LendingWithdraw],
    synchronize: true,
  }), KafkaModule, LendingDepositCommandsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
