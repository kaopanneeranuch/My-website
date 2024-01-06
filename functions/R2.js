export async function onRequest(context) {
    const url = 'https://pub-0c1c4857f314440c8ad5975a6d7b656a.r2.dev/Logo_color.png';
    const response = await fetch(url);
    const body = await response.arrayBuffer();

    return new Response(body, {
        headers: { 'Content-Type': 'image/png' },
    });
}