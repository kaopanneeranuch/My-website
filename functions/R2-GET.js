export async function onRequestGet(context) {
    try {
        const url = new URL(context.request.url);
        const key = url.searchParams.get('key');

        if (!key) {
            return new Response('Missing key parameter', { status: 400 });
        }

        const obj = await context.env.MY_BUCKET.get(key);

        if (obj === null) {
            return new Response('Not found', { status: 404 });
        }

        const body = await obj.arrayBuffer();

        return new Response(body, {
            headers: { 'Content-Type': 'image/png' },
        });
    } catch (error) {
        return new Response(`Error: ${error.message} + ${context.request.url}`, { status: 500 });
        // return new Response(`Error: ${error.message} + ${json[params]}`, { status: 500 });
    }
}