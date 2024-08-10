export default async function Lightbean({ params }: { params: {} }) {
    const data = await fetch(`http://api.lightbeans.com/organizations/banas-porcelain/products/tuscany-silver-36x24-v3`).then((res) => res.json());
    return (
      <main>
        <div>
          {data}
        </div>
      </main>
    );
  }