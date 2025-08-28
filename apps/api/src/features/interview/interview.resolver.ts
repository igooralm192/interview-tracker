import { Query, Resolver } from '@nestjs/graphql';
import { Interview } from './interview.model';
import { InterviewRepository } from './interview.repository';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  @Query(() => [Interview])
  async interviews(): Promise<Interview[]> {
    return this.interviewRepository.findAll();
  }
}
