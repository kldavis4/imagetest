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
  const duration = await test();
  return (
    <main>
      <div>
        {duration}ms
      </div>
    </main>
  );
}