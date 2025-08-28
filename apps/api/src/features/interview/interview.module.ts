import { Module } from '@nestjs/common';
import { InterviewResolver } from './interview.resolver';
import { InterviewRepository } from './interview.repository';

@Module({
  providers: [InterviewResolver, InterviewRepository],
})
export class InterviewModule {}
