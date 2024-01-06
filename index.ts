export default {
    async fetch(request: { url: string | URL; method: any; body: any; }, env: { MY_BUCKET: { put: (arg0: string, arg1: any) => any; get: (arg0: string) => any; delete: (arg0: string) => any; }; }) {
      const url = new URL(request.url);
      const key = url.pathname.slice(1);
  
      switch (request.method) {
        case 'PUT':
          await env.MY_BUCKET.put(key, request.body);
          return new Response(`Put ${key} successfully!`);
        case 'GET':
          const object = await env.MY_BUCKET.get(key);
  
          if (object === null) {
            return new Response('Object Not Found', { status: 404 });
          }
  
          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set('etag', object.httpEtag);
  
          return new Response(object.body, {
            headers,
          });
        case 'DELETE':
          await env.MY_BUCKET.delete(key);
          return new Response('Deleted!');
  
        default:
          return new Response('Method Not Allowed', {
            status: 405,
            headers: {
              Allow: 'PUT, GET, DELETE',
            },
          });
      }
    },
  };

  // interface Env {
  //   BUCKET: R2Bucket;
  // }
  
  // export const onRequest: PagesFunction<Env> = async (context) => {
  //   const obj = await context.env.BUCKET.get('some-key');
  //   if (obj === null) {
  //     return new Response('Not found', { status: 404 });
  //   }
  //   return new Response(obj.body);
  // }