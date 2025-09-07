import { Global, Inject, Module, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_POOL',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        return new Pool({ connectionString });
      },
    },
    {
      provide: 'DRIZZLE_DB',
      inject: ['PG_POOL'],
      useFactory: (pool: Pool) => drizzle(pool),
    },
  ],
  exports: ['DRIZZLE_DB', 'PG_POOL'],
})
export class DbModule implements OnApplicationShutdown {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async onApplicationShutdown(signal?: string) {
    await this.pool.end();
  }
}
