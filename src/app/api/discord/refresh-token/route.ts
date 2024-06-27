// import { db } from '@/lib/db/db';
// import { NextRequest, NextResponse } from 'next/server';
// import dotenv from 'dotenv';
// import { addSeconds } from 'date-fns';

// dotenv.config({ path: '.env.local' });
// // !Note: This is a server component so these variables will not be exposed to the client.
// const { APPLICATION_ID, CLIENT_ID, CLIENT_SECRET } = process.env;

// if (!APPLICATION_ID) {
//   console.error('APPLICATION_ID is not set in .env file.');
//   process.exit(1);
// } else if (!CLIENT_ID) {
//   console.error('CLIENT_ID is not set in .env file.');
//   process.exit(1);
// } else if (!CLIENT_SECRET) {
//   console.error('CLIENT_SECRET is not set in .env file.');
//   process.exit(1);
// }

// export async function POST(request: NextRequest) {
//   // Exchange the access code for access token and refresh token:
//   const revokedRes = await fetch(
//     'https://discord.com/api/v10/oauth2/token/revoke',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Authorization: `Basic ${Buffer.from(
//           `${CLIENT_ID}:${CLIENT_SECRET}`
//         ).toString('base64')}`,
//       },
//       body: `token=${token}&token_type_hint=access_token`,
//     }
//   );

//   const tokensResBody = await revokedRes.json();
//   console.log(tokensResBody);

//   return NextResponse.json({ revokedRes: tokensResBody }, { status: 200 });
// }
