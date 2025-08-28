import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './features/user/user.module';
import { InterviewModule } from './features/interview/interview.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: process.env.NODE_ENV !== 'production',
    }),
    UserModule,
    InterviewModule,
    ConfigModule.forRoot(),
    DbModule,
  ],
})
export class AppModule {}
