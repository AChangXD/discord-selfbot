import Image from 'next/image';
import dotenv from 'dotenv';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

const AUTHORIZE_URL = 'https://discord.com/api/v10/oauth2/authorize';

export default async function Home() {
  console.log('APPLICATION_ID', APPLICATION_ID);
  console.log('CLIENT_ID', CLIENT_ID);
  console.log('CLIENT_SECRET', CLIENT_SECRET);

  /* -------------------------------------------------------------------------- */
  /*                                   States                                   */

  /* -------------------------------------------------------------------------- */
  /*                                 JSX Return                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link
          href={
            AUTHORIZE_URL +
            `?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/api/discord&scope=bot&permissions=8`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Sign In For Discord</Button>
        </Link>
      </div>
    </main>
  );
}
