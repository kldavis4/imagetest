import { cacheGet, cacheSet } from './cache';
export const dynamic = 'force-dynamic'

const test = async () => {
  let val = await cacheGet('my-id');
  if (!val) {
    val = Math.random().toString(36).substring(7);
    await cacheSet('my-id', val);
  }
  return val
}

export default async function Page() {
  const val = await test() as any;
  return (
    <main>
      <div>
        {val}
      </div>
    </main>
  );
}