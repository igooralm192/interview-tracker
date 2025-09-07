import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import request from 'supertest';

import { AppModule } from '../src/app.module';
import { interviewsTable } from '../src/features/interview/interview.schema';
import { setupTestDbContainer, setupTestDbMigration } from './setup-test-db';
import { AuthGuard } from '../src/auth/auth.guard';
import { MockAuthGuard } from './mock-auth.guard';

describe('Interviews E2E', () => {
  let app: INestApplication;
  let db: NodePgDatabase;
  let container: StartedPostgreSqlContainer;

  beforeAll(async () => {
    container = await setupTestDbContainer();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    db = await setupTestDbMigration(app);
  });

  it(`/GET interviews`, async () => {
    await db.insert(interviewsTable).values({
      company: 'Company',
      jobTitle: 'Job Title',
      jobDescription: 'Job Description',
      contactType: 'active',
      priority: 'low',
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: '{ interviews { company } }',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        interviews: [{ company: 'Company' }],
      },
    });
  });

  afterAll(async () => {
    await app.close();
    await container.stop();
  });
});
