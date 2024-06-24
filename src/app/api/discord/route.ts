import { db } from '@/lib/db/db';
import { NextRequest, NextResponse } from 'next/server';
import { discordTable } from './schema';
import dotenv from 'dotenv';
import { addSeconds } from 'date-fns';

dotenv.config({ path: '.env.local' });
// !Note: This is a server component so these variables will not be exposed to the client.
const { APPLICATION_ID, CLIENT_ID, CLIENT_SECRET } = process.env;

if (!APPLICATION_ID) {
  console.error('APPLICATION_ID is not set in .env file.');
  process.exit(1);
} else if (!CLIENT_ID) {
  console.error('CLIENT_ID is not set in .env file.');
  process.exit(1);
} else if (!CLIENT_SECRET) {
  console.error('CLIENT_SECRET is not set in .env file.');
  process.exit(1);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const accessCode = searchParams.get('code');
  const error = searchParams.get('error');
  console.log('AC:', accessCode);

  if (!accessCode && !error) {
    return NextResponse.json(
      { error: 'Missing access code and no error given' },
      { status: 400 }
    );
  } else if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  // Exchange the access code for access token and refresh token:
  const tokens = await fetch('https://discord.com/api/v10/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: `grant_type=authorization_code&code=${accessCode}&redirect_uri=http://localhost:3000/api/discord`,
  });

  const tokensResBody = await tokens.json();

  if (
    tokensResBody &&
    tokensResBody.access_token &&
    tokensResBody.refresh_token &&
    tokensResBody.expires_in
  ) {
    const discordEntryRes = await db.select().from(discordTable);

    if (discordEntryRes.length === 0) {
      const newEntryRes = await db
        .insert(discordTable)
        .values({
          accessToken: tokensResBody.access_token,
          refreshToken: tokensResBody.refresh_token,
          expiresAt: addSeconds(new Date(), tokensResBody.expires_in as number),
        })
        .returning();
      return NextResponse.json(
        { accessCode: accessCode, updatedRes: newEntryRes },
        { status: 200 }
      );
    } else {
      const updateEntryRes = await db
        .update(discordTable)
        .set({
          accessToken: tokensResBody.access_token,
          refreshToken: tokensResBody.refresh_token,
          expiresAt: addSeconds(new Date(), tokensResBody.expires_in as number),
        })
        .returning();
      return NextResponse.json(
        { accessCode: accessCode, updatedRes: updateEntryRes },
        { status: 200 }
      );
    }
  }
}
