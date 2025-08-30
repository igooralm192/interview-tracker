import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

import { InterviewRepository } from './interview.repository';
import { Interview } from './interview.model';
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

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async getError(@Context() ctx: GraphQLContext) {
    Sentry.logger.info('User triggered error', {
      userId: ctx.req.user?.userId,
    });
    throw new Error('Fake error');
  }
}
