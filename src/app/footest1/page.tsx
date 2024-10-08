import Image from "next/image";

export default function Home() {
  const images = []
  for (let i = 0; i < 3; i++) {
    images.push({
      src: "https://cdn.sanity.io/images/y25r8d4i/production/19da7ddf12544b5f17203b084ed4be52f006974f-2048x1365.webp?rect=342,0,1365,1365&w=1000&h=1000&fit=crop&auto=format",
      alt: "Next.js Logo",
      width: 500,
      height: 500,
      quality: i
    })
  }
  console.log('here')
  return (
    <main>

      <div>
        {images.map((image, index) => (
          <div key={index}>
            <Image {...image} />
            </div>
        ))}
      </div>
    </main>
  );
}
