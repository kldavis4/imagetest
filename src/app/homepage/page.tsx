// export const revalidate = 60;
// TODO need source code
export default async function Homepage({ params }: { params: {} }) {
    const keys = [
        'noce-48x24-v2',
        // 'noce-24x24',
        // 'tuscany-silver-36x24-v3',
        // 'sahara-sands-36x24-v3',
        // 'brown-timber-8x36-v3',
        // 'sahara-sands-36x24-v3',
        // 'morning-sky-heringbone',
        // 'morning-sky-32x16-v3',
        // 'grigio-48x24-v2',
        // 'grigio-24x24',
        // 'bianco-48x24-v2',
        // 'bianco-24x24',
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