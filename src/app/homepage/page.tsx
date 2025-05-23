
// export const revalidate = 60;
// TODO need source code
export default async function Homepage() {
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


    return new Response(`<div>HELLO: ${results.length}</div>`, {
        status: 200,
        headers: {
            'Set-Cookie': 'cookie-name=cookie-value; HttpOnly; Secure; Max-Age=604800; Path=/',
            'Cache-Control': 'private, no-store, max-age=0',
            'Content-Type': 'text/html; charset=utf-8',
        },
    })
}