import { Context, Query, Resolver } from '@nestjs/graphql';
import { Interview } from './interview.model';
import { InterviewRepository } from './interview.repository';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import type { GraphQLContext } from '../../types/graphql.context';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(private readonly interviewRepository: InterviewRepository) {}

  @UseGuards(AuthGuard)
  @Query(() => [Interview])
  async interviews(@Context() ctx: GraphQLContext): Promise<Interview[]> {
    return this.interviewRepository.findAll();
  }
}
