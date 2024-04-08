
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Events } from './events.dto';

@Entity('lending-withdraw')
export class LendingWithdraw {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
    })
    id: number;

    @ManyToOne(type => Events, Events => Events.lending_withdraw)
    public events: Events;

    @Column({
        type: 'varchar',
        name: 'hash',
        length: 64
    })
    data_hash: string;

    @Column({
        type: 'varchar',
        name: 'from_address',
        length: 42
    })
    from_address: string;

    @Column({
        type: 'varchar',
        name: 'to_address',
        length: 42
    })
    to_address: string;

    @Column({
        type: 'bigint',
        name: 'unix_timestamp'
    })
    unix_timestamp: number;

    @Column({
        type: 'varchar',
        name: 'owner_address',
        length: 42
    })
    owner_address: string;

    @Column({
        type: 'bigint',
        name: 'amount'
    })
    amount: string;
    events_id: number;

}
