import { Injectable, OnModuleInit, OnApplicationShutdown } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";


@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {

    private readonly kafKa = new Kafka({
        brokers: ['localhost:9092']
    });

    private readonly producer: Producer = this.kafKa.producer();

    async onModuleInit() {
        await this.producer.connect();
    }

    async produce(record: ProducerRecord) {
        await this.producer.send(record);

    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}
