import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { Interview } from './interview.model';
import { interviewsTable } from './interview.schema';

@Injectable()
export class InterviewRepository {
  constructor(@Inject('DRIZZLE_DB') private readonly db: NodePgDatabase) {}

  async findAll(): Promise<Interview[]> {
    return this.db.select().from(interviewsTable);
  }
}
