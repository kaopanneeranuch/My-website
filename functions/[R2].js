// export async function onRequestGet(context) {
//     try {
//         const obj = await context.env.MY_BUCKET.get('Logo_color.png');

//         if (obj === null) {
//             return new Response('Not found', { status: 404 });
//         }

//         const body = await obj.arrayBuffer();

//         return new Response(body, {
//             headers: { 'Content-Type': 'image/png' },
//         });
//     } catch (error) {
//         return new Response(`Error: ${error.message}`, { status: 500 });
//     }
// }

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

addEventListener('fetch', event => {
    const request = event.request;
    if (request.method === 'GET') {
        event.respondWith(onRequestGet(request));
    } else {
        event.respondWith(new Response('Invalid request method', { status: 405 }));
    }
});

// addEventListener('fetch', event => {
//     const url = new URL(event.request.url);
//     const path = url.pathname;

//     if (path === '/get') {
//         event.respondWith(onRequestGet(event.request));
//     } else if (path === '/post') {
//         event.respondWith(onRequestPost(event.request));
//     } else if (path === '/delete') {
//         event.respondWith(onRequestDelete(event.request));
//     } else {
//         event.respondWith(new Response('Invalid path', { status: 404 }));
//     }
// });

export async function onRequestGet(request) {
    try {
        if (!request || !request.url) {
            return new Response('Invalid request', { status: 400 });
        }

        const url = new URL(request.url);
        const key = url.searchParams.get('key');

        if (!key) {
            return new Response('Missing key parameter', { status: 400 });
        }

        const obj = await MY_BUCKET.get(key);

        if (obj === null) {
            return new Response('Not found', { status: 404 });
        }

        const body = await obj.arrayBuffer();

        return new Response(body, {
            headers: { 'Content-Type': 'image/png' },
        });
    } catch (error) {
        return new Response(`Error: ${error.message} + ${request.url}`, { status: 500 });
    }
}

// export async function onRequestPost(request) {
//     try {
//         const file = await request.arrayBuffer();
//         const url = new URL(request.url);
//         const filename = url.searchParams.get('key');

//         if (!filename) {
//             return new Response('Missing key parameter', { status: 400 });
//         }

//         await MY_BUCKET.put(filename, file, { contentType: 'image/png' });

//         return new Response('File uploaded successfully', { status: 200 });
//     } catch (error) {
//         return new Response(`Error: ${error.message}`, { status: 500 });
//     }
// }

// export async function onRequestDelete(request) {
//     try {
//         const url = new URL(request.url);
//         const filename = url.searchParams.get('key');

//         if (!filename) {
//             return new Response('Missing key parameter', { status: 400 });
//         }

//         await MY_BUCKET.delete(filename);

//         return new Response('File deleted successfully', { status: 200 });
//     } catch (error) {
//         return new Response(`Error: ${error.message}`, { status: 500 });
//     }
// }