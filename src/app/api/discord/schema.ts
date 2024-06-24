import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const discordTable = pgTable('discord', {
  id: uuid('id').primaryKey().defaultRandom(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  expiresAt: timestamp('expires_at'),
});
