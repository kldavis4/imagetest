import {NextPage} from "next";

export const dynamic = 'force-dynamic'
import { unstable_cache } from 'next/cache'

const fakeFetch = unstable_cache(async (id: string) => Promise.resolve({ id }), ['my-id']);
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {}; // or Record<string, string | string[] | undefined> if you expect dynamic route params on other pages
}
export async function generateStaticParams() {
  return [];
}

const test = async () => {
  const id = Math.random().toString(36).substring(7);
  const start = Date.now();
  const data = await fakeFetch(id);
  return Date.now() - start;
}
const Page: NextPage<PageProps> = async ({ searchParams, params }) => {
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
export default Page;