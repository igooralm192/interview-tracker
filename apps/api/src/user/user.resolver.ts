import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      externalId: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
