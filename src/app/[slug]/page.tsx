export default async function Slug({ params }: { params: { slug: string } }) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data/?slug=${params.slug}`).then((res) => res.json());
  return (
    <main>
      <div>
        {params.slug} {data.message}
      </div>
    </main>
  );
}
