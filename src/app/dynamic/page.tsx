export const dynamic = 'force-dynamic'

export default async function DynamicPage() {
  const keys = [
    'noce-48x24-v2',
  ]
  const results = [];
  for (const key of keys) {
    const res = await fetch(`http://api.lightbeans.com/organizations/banas-porcelain/products/${key}`, {
      next: {
        tags: ['homepage'],
        revalidate: 600
      }
    }).then((res) => res.json());
    results.push(res);
  }

  return (
    <main>
      <div>
        {JSON.stringify(results)}
      </div>
    </main>
  );
}