// const {Storage} = require('@google-cloud/storage');

// const storage = new Storage();
// async function generateV4ReadSignedUrl(filename) {
//   // These options will allow temporary read access to the file
//   const options = {
//     version: 'v4',
//     action: 'read',
//     expires: Date.now() + 15 * 60 * 1000, // 15 minutes
//   };

//   // Get a v4 signed URL for reading the file
//   const [url] = await storage
//     .bucket('test-r2')
//     .file(filename)
//     .getSignedUrl(options);

//   console.log('Generated GET signed URL:');
//   console.log(url);
//   console.log('You can use this URL with any user agent, for example:');
//   console.log(`curl '${url}'`);
// }

// generateV4ReadSignedUrl('Logo_color.png').catch(console.error); // pass the filename as a parameter

// export async function onRequest(context) {
//     const url = 'https://pub-0c1c4857f314440c8ad5975a6d7b656a.r2.dev/Logo_color.png';
//     const response = await fetch(url);
//     const body = await response.arrayBuffer();

//     return new Response(body, {
//         headers: { 'Content-Type': 'image/png' },
//     });
// }

// export async function onRequest(request) {
//     const url = new URL(request.url);
//     const filename = url.searchParams.get('photo');
//     const imageUrl = `https://pub-0c1c4857f314440c8ad5975a6d7b656a.r2.dev/${filename}`;

//     const response = await fetch(imageUrl);
//     const body = await response.arrayBuffer();

//     return new Response(body, {
//         headers: { 'Content-Type': 'image/png' },
//     });
// }

export async function onRequest(request) {
    const url = new URL(request.url);
    const filename = url.pathname.split('/').pop();
    const imageUrl = `https://pub-0c1c4857f314440c8ad5975a6d7b656a.r2.dev/${filename}`;

    const response = await fetch(imageUrl);
    const body = await response.arrayBuffer();

    return new Response(body, {
        headers: { 'Content-Type': 'image/png' },
    });
}

// export async function onRequest(context) {
//     const obj = await context.env.BUCKET.get('some-key');
//     if (obj === null) {
//       return new Response('Not found', { status: 404 });
//     }
//     return new Response(obj.body);
//   }