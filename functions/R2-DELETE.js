// export async function onRequestDelete(context, request) {
//     try {
//         const url = new URL(request.url);
//         const key = url.searchParams.get('key');

//         if (!key) {
//             return new Response('Missing key parameter', { status: 400 });
//         }

//         await context.env.BUCKET.delete(`${key}.png`);

//         return new Response('File deleted successfully', { status: 200 });
//     } catch (error) {
//         return new Response(`Error: ${error.message} + ${request.url}`, { status: 500 });
//     }
// }

export async function onRequestDelete(context) {
    try {
        const url = new URL(context.request.url);
        const key = url.searchParams.get('key');

        if (!key) {
            return new Response('Missing key parameter', { status: 400 });
        }

        await context.env.MY_BUCKET.delete(key);

        return new Response('File deleted successfully', { status: 200 });

    } catch (error) {
        return new Response(`Error: ${error.message} + ${context.request.url}`, { status: 500 });
        // return new Response(`Error: ${error.message} + ${json[params]}`, { status: 500 });
    }
}