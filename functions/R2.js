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

// export async function onRequest(request) {
//     const url = new URL(request.url);
//     const filename = url.pathname.split('/').pop();
//     const imageUrl = `https://pub-0c1c4857f314440c8ad5975a6d7b656a.r2.dev/${filename}`;

//     const response = await fetch(imageUrl);
//     const body = await response.arrayBuffer();

//     return new Response(body, {
//         headers: { 'Content-Type': 'image/png' },
//     });
// }

// https://e3d30f7fe06566a7cb16c9637b5774b7.r2.cloudflarestorage.com/test-r2

export async function onRequestGet(context) {
    // Replace 'Logo_color.png' with the key of the object you want to retrieve
    const obj = await context.env.MY_BUCKET.get('Logo_color.png', 'arrayBuffer');

    if (obj === null) {
        return new Response('Not found', { status: 404 });
    }

    return new Response(obj, {
        headers: { 'Content-Type': 'image/png' },
    });
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