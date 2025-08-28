import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [{
    provide: 'DRIZZLE_DB',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const pool = new Pool({
        connectionString: configService.get<string>('DATABASE_URL'),
      });
      return drizzle(pool);
    },
  },],
  exports: ['DRIZZLE_DB'],
})
export class DbModule {}
