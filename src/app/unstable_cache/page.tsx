export const dynamic = 'force-dynamic'
import { unstable_cache } from 'next/cache'
const fakeFetch = unstable_cache(async (id: string) => Promise.resolve({ id }), ['my-id']);

export default async function Page() {
  // generate random id
  const id = Math.random().toString(36).substring(7);
  const start = Date.now();
  const data = await fakeFetch(id);
  const duration = Date.now() - start;

  return (
    <main>
      <div>
        {JSON.stringify(data)} {duration}ms
      </div>
    </main>
  );
}