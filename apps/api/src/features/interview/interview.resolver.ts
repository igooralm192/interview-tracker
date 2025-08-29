import { Query, Resolver } from '@nestjs/graphql';
import { Interview } from './interview.model';
import { InterviewRepository } from './interview.repository';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  @Query(() => [Interview])
  @UseGuards(AuthGuard)
  async interviews(): Promise<Interview[]> {
    return this.interviewRepository.findAll();
  }
}
