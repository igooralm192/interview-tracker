import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Interview } from './interview.model';
import { AuthGuard } from '../../auth/auth.guard';
import type { GraphQLContext } from '../../types/graphql.context';
import { interviewsTable } from './interview.schema';

@Resolver(() => Interview)
export class InterviewResolver {
  constructor(@Inject('DRIZZLE_DB') private readonly db: NodePgDatabase) {}

  @UseGuards(AuthGuard)
  @Query(() => [Interview])
  async interviews(@Context() ctx: GraphQLContext): Promise<Interview[]> {
    return this.db.select().from(interviewsTable);
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
