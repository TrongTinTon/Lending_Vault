import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly kafKa = new Kafka({
        brokers: ['localhost:9092']
    });

    private readonly consumers: Consumer[] = [];
    async comsume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
        const consumer = this.kafKa.consumer({ groupId: 'nestjs-kafka' });
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }

}