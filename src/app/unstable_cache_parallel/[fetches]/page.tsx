import {NextPage} from "next";
import { unstable_cache } from 'next/cache'

export const dynamic = 'force-dynamic'

const fakeFetch = unstable_cache(async (id: string) => Promise.resolve({ id }), ['my-id']);

interface PageProps {
  params: { fetches: string }; // Dynamic route parameter
}

const test = async () => {
  const id = Math.random().toString(36).substring(7);
  const start = Date.now();
  const data = await fakeFetch(id);
  return Date.now() - start;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const fetches = parseInt(params.fetches || '1'); // Get fetches from params

  const durations = await Promise.all(Array(fetches).fill(0).map(async () => await test()));
  const duration = durations.join('ms, ');

  return (
    <main>
      <div>
        {duration}
      </div>
    </main>
  );
}

export default Page;