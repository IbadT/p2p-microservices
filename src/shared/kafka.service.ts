// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { Kafka, Producer, Consumer } from 'kafkajs';

// @Injectable()
// export class KafkaService implements OnModuleInit {
//   private kafka: Kafka;
//   private producer: Producer;
//   private consumer: Consumer;

//   constructor() {
//     this.kafka = new Kafka({
//       clientId: 'p2p-exchange',
//       brokers: ['localhost:9092'],
//     });

//     this.producer = this.kafka.producer();
//     this.consumer = this.kafka.consumer({ groupId: 'p2p-exchange-group' });
//   }

//   async onModuleInit() {
//     await this.producer.connect();
//     await this.consumer.connect();
//   }

//   async emit(topic: string, message: any) {
//     await this.producer.send({
//       topic,
//       messages: [{ value: JSON.stringify(message) }],
//     });
//   }

//   async subscribe(topic: string, callback: (message: any) => Promise<void>) {
//     await this.consumer.subscribe({ topic });
//     await this.consumer.run({
//       eachMessage: async ({ message }) => {
//         const value = JSON.parse(message.value.toString());
//         await callback(value);
//       },
//     });
//   }

//   async onModuleDestroy() {
//     await this.producer.disconnect();
//     await this.consumer.disconnect();
//   }
// } 