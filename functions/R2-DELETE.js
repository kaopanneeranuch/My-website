// How can I secure my serverless function to prevent unauthorized deletion of objects from the bucket?

export async function onRequestDelete(context) {
    try {
        const url = new URL(context.request.url);
        const key = url.searchParams.get('key');
        // const apiKey = url.searchParams.get('apiKey');

        // if (!apiKey || apiKey !== 'your_api_key') {
        //     return new Response('Invalid API key', { status: 401 });
        // }

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