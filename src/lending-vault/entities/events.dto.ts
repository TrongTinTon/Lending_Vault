
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LendingDeposit } from './lending-deposit.dto';
import { LendingWithdraw } from './lending-withdraw.dto';

@Entity('events')
export class Events {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @OneToMany(type => LendingDeposit, LendingDeposit => LendingDeposit.events, { cascade: ['insert', 'update', 'remove'] })
    public lending_deposit?: LendingDeposit[];

    @OneToMany(type => LendingWithdraw, LendingWithdraw => LendingWithdraw.events, { cascade: ['insert', 'update', 'remove'] })
    public lending_withdraw?: LendingWithdraw[];

    @Column({
        type: 'varchar',
        name: 'event_id',
        unique: true
    })
    event_id: string;

    @Column({
        type: 'timestamp',
        name: 'timestamp'
    })
    timestamp: string;

    @Column({
        type: 'varchar',
        name: 'type',
        length: 100
    })
    type: string;

    @Column({
        type: 'varchar',
        name: 'specification_ver',
        length: 10
    })
    specification_ver: string;
}
