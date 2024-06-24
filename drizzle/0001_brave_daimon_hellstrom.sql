CREATE TABLE IF NOT EXISTS "discord" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"expires_at" timestamp
);
