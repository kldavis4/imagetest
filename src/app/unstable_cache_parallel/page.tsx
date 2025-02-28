export const dynamic = 'force-dynamic'
import { unstable_cache } from 'next/cache'
import { useSearchParams } from 'next/navigation';

const fakeFetch = unstable_cache(async (id: string) => Promise.resolve({ id }), ['my-id']);

const test = async () => {
  const id = Math.random().toString(36).substring(7);
  const start = Date.now();
  const data = await fakeFetch(id);
  return Date.now() - start;
}
export default async function Page() {
  const searchParams = useSearchParams();
  // get number of fetches to perform from query parameter
  const fetches = parseInt(searchParams.get('fetches') || '1');

  // perform fetches
  const durations = await Promise.all(Array(fetches).fill(0).map(async () => await test()));
  // format as a list
  const duration = durations.join('ms, ');
  return (
    <main>
      <div>
        {duration}
      </div>
    </main>
  );
}