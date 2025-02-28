export const dynamic = 'force-dynamic'
import { unstable_cache } from 'next/cache'
const fakeFetch = unstable_cache(async (id: string) => Promise.resolve({ id }), ['my-id']);

const test = async () => {
  const id = Math.random().toString(36).substring(7);
  const start = Date.now();
  const data = await fakeFetch(id);
  return Date.now() - start;
}
export default async function Page() {
  // get number of fetches to perform from query parameter
  const fetches = parseInt(new URLSearchParams(location.search).get('fetches') || '1');
  // perform fetches sequentially
  const durations = [];
  for (let i = 0; i < fetches; i++) {
    durations.push(await test());
  }
  
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