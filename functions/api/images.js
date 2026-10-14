export async function onRequestGet({ request, env }) { const key = new URL(request.url).searchParams.get('key') || ''; if (!/^project-[a-zA-Z0-9-]+$/.test(key))
    return new Response('Not found', { status: 404 }); const item = await env.BUCKET.get(key); if (!item)
    return new Response('Not found', { status: 404 }); return new Response(item.body, { headers: { 'Content-Type': item.httpMetadata?.contentType || 'image/jpeg', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'public, max-age=3600' } }); }
