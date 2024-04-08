import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  Home() {
    return 'Bài test phỏng vấn -  NestJs +  Kafka service + MySQL';
  }
}
