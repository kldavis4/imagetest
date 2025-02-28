export const dynamic = 'force-dynamic'
import { unstable_cache } from 'next/cache'
import { useSearchParams } from 'next/navigation';

const fakeFetch = unstable_cache(async (id: string) => Promise.resolve({ id }), ['my-id']);
interface PageProps {
  params: {
    searchParams: {
      [key: string]: string | string[] | undefined;
    };
  };
}

const test = async () => {
  const id = Math.random().toString(36).substring(7);
  const start = Date.now();
  const data = await fakeFetch(id);
  return Date.now() - start;
}
export default async function Page({ params }: PageProps) {
  const searchParams = params.searchParams;

  // get number of fetches to perform from query parameter
  const fetches = parseInt(searchParams.fetches as string || '1');

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