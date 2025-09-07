import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { INestApplication } from '@nestjs/common';

export async function setupTestDbContainer() {
  const container = await new PostgreSqlContainer('postgres:15').start();
  process.env.DATABASE_URL = container.getConnectionUri();

  return container;
}

export async function setupTestDbMigration(app: INestApplication) {
  const db = app.get('DRIZZLE_DB');
  await migrate(db, { migrationsFolder: './src/db/migrations' });

  return db;
}
