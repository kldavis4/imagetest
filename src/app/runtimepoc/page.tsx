import * as vercelFunctions from '@vercel/functions';
export const dynamic = 'force-dynamic'

const test = async () => {
  let val = await (vercelFunctions as any).cacheGet('my-id');
  if (!val) {
    val = Math.random().toString(36).substring(7);
    await (vercelFunctions as any).cacheSet('my-id', val);
  }
  return val
}

export default async function Page() {
  const val = await test();
  return (
    <main>
      <div>
        val
      </div>
    </main>
  );
}