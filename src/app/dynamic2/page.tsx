export const dynamic = 'force-dynamic'

export default async function DynamicPage() {
  const keys = [
    'bianco-24x24',
  ]
  const results = [];
  for (const key of keys) {
    const res = await fetch(`http://api.lightbeans.com/organizations/banas-porcelain/products/${key}`, {
      next: {
        tags: ['homepage'],
        revalidate: 10
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