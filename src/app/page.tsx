import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {
  const images = []
  for (let i = 0; i < 2; i++) {
    images.push({
      src: "https://cdn.sanity.io/images/y25r8d4i/production/19da7ddf12544b5f17203b084ed4be52f006974f-2048x1365.webp?rect=342,0,1365,1365&w=1000&h=1000&fit=crop&auto=format",
      alt: "Next.js Logo",
      width: 500,
      height: 500,
      quality: i
    })
  }
  const res = await fetch(`http://api.lightbeans.com/organizations/banas-porcelain/products/noce-24x24`, {
    next: {
      tags: ['homepage'],
      revalidate: 600
    }
  }).then((res) => res.json());
  return (
    <main className={styles.main}>

      <div className={styles.grid}>
        <h1>{JSON.stringify(res)}</h1>
        {images.map((image, index) => (
          <div key={index} className={styles.card}>
            <Image {...image} />
            </div>
        ))}
      </div>
    </main>
  );
}
