export const dynamic = "force-static";
export const revalidate = 120;

// export async function generateStaticParams() {
//   return [
//     { slug: "hello" }, 
//     { slug: "world" }, 
//     { slug: "foobar" },
//   ]
// }

export default async function Slug({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('|')
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/data/?slug=${slug}`).then((res) => res.json());
  return (
    <main>
      <div>
        {slug} {data.message}
      </div>
    </main>
  );
}
