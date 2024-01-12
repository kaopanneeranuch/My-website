// export async function onRequestGet(context) {
//     const obj = await context.env.MY_BUCKET.get('Logo_color.png');

//     if (obj === null) {
//         return new Response('Not found', { status: 404 });
//     }

//     const body = await obj.arrayBuffer();

//     return new Response(body, {
//         headers: { 'Content-Type': 'image/png' },
//     });
// }

addEventListener('fetch', event => {
    event.respondWith(onRequestGet(event.request));
});

export async function onRequestGet(request) {
    try {
        const url = new URL(request.url);
        const key = url.searchParams.get('key');

        if (!key) {
            return new Response('Missing key parameter', { status: 400 });
        }

        const obj = await MY_BUCKET.get(key, 'arrayBuffer');

        if (obj === null) {
            return new Response('Not found', { status: 404 });
        }

        return new Response(obj, {
            headers: { 'Content-Type': 'image/png' },
        });
    } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
    }
}

// export async function onRequestPost(context, request) {
//     const file = await request.arrayBuffer();
//     const filename = 'your_file_name.png'; // Replace with your file name

//     await context.env.BUCKET.put(filename, file, { contentType: 'image/png' }); // Replace 'image/png' with your file's MIME type

//     return new Response('File uploaded successfully', { status: 200 });
// }

// export async function onRequestDelete(context) {
//     const filename = 'Logo_color.png'; // Replace with the key of the object you want to delete

//     await context.env.BUCKET.delete(filename);

//     return new Response('File deleted successfully', { status: 200 });
// }