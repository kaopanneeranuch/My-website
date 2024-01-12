export async function onRequestGet(context) {
    try {
        const obj = await context.env.MY_BUCKET.get('Logo_color.png');

        if (obj === null) {
            return new Response('Not found', { status: 404 });
        }

        const body = await obj.arrayBuffer();

        return new Response(body, {
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

// addEventListener('fetch', event => {
//     event.respondWith(onRequestGet(event.request));
// });

// addEventListener('fetch', event => {
//     const request = event.request;
//     if (request.method === 'GET') {
//         event.respondWith(onRequestGet(request));
//     } else if (request.method === 'POST') {
//         event.respondWith(onRequestPost(request));
//     } else if (request.method === 'DELETE') {
//         event.respondWith(onRequestDelete(request));
//     } else {
//         event.respondWith(new Response('Invalid request method', { status: 405 }));
//     }
// });

// export async function onRequestGet(request) {
//     try {
//         console.log(request.url)
//         const url = new URL(request.url);
//         const key = url.searchParams.get('key');

//         if (!key) {
//             return new Response('Missing key parameter', { status: 400 });
//         }

//         const obj = await MY_BUCKET.get(key);

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