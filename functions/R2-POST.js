export async function onRequestPost(context) {
    try {
        const body = await context.request.arrayBuffer(); // assuming the body is a binary image
        const key = context.request.headers.get('key'); // assuming the key is sent in headers

        if (!key) {
            return new Response('Missing key in headers', { status: 400 });
        }

        await context.env.MY_BUCKET.put(key, body); // upload the image to the bucket

        return new Response('Image uploaded successfully', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        });
    } catch (error) {
        return new Response(`Error: ${error.message} + ${context.request.url}`, { status: 500 });
    }
}

// export async function onRequestPost(context) {
//     try {
//         const body = await context.request.text(); // read the body as text
//         const boundary = context.request.headers.get('content-type').split('boundary=')[1]; // extract the boundary from the content-type header
//         const parts = body.split('--' + boundary); // split the body into parts based on the boundary

//         let key, file;

//         for (let part of parts) {
//             if (part.includes('form-data; name="key"')) {
//                 key = part.split('\r\n\r\n')[1]; // extract the key from the part
//             } else if (part.includes('form-data; name="file"')) {
//                 const fileData = part.split('\r\n\r\n')[1]; // extract the file data from the part
//                 file = new Uint8Array(fileData.length); // create a new Uint8Array to hold the file data

//                 for (let i = 0; i < fileData.length; i++) {
//                     file[i] = fileData.charCodeAt(i); // convert the file data to binary
//                 }
//             }
//         }

//         if (!key || !file) {
//             return new Response('Missing key or file', { status: 400 });
//         }

//         await context.env.MY_BUCKET.put(key, file); // upload the image to the bucket

//         return new Response('Image uploaded successfully', {
//             status: 200,
//             headers: { 'Content-Type': 'text/plain' },
//         });
//     } catch (error) {
//         return new Response(`Error: ${error.message} + ${context.request.url}`, { status: 500 });
//     }
// }