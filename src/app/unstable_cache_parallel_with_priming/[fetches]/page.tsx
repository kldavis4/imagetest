import {NextPage} from "next";
import { unstable_cache } from 'next/cache'

export const dynamic = 'force-dynamic'


interface PageProps {
  params: Promise<{ fetches: string }>; // Dynamic route parameter
}

const fakeFetch = unstable_cache(async (id: string) => Promise.resolve({ id }), ['my-id']);

const test = async () => {
  const id = Math.random().toString(36).substring(7);
  const start = Date.now();
  await fakeFetch(id);
  return Date.now() - start;
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { fetches: fetchesParam } = await params; // Get fetches from params
  const fetches = parseInt(fetchesParam || '1'); // Get fetches from params

  // initial query
  const primeDurations = []
  for (let i = 0; i < fetches; i++) {
    const result = await test()
    primeDurations.push(result)
  }

  const durations = await Promise.all(Array(fetches).fill(0).map(async () => await test()));
  const duration = durations.join('ms, ');
  const primeDuration = primeDurations.join('ms, ');

  return (
    <main>
      <div>
        <div>
          <h1>Priming (sequential)</h1>
          {primeDuration}
        </div>
        <div>
         <h1>Parallel</h1>
          {duration}
        </div>
      </div>
    </main>
  );
}

export default Page;