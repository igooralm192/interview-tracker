import { Module } from '@nestjs/common';
import { InterviewResolver } from './interview.resolver';

@Module({
  providers: [InterviewResolver],
})
export class InterviewModule {}
