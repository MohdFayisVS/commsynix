import { authorized } from '../_lib/auth.js';
export async function onRequestGet({ request, env }) { const admin = new URL(request.url).searchParams.has('admin'); if (admin && !await authorized(request, env))
    return Response.json({ error: 'Sign in required' }, { status: 401 }); const data = await env.DB.prepare(admin ? 'SELECT * FROM projects ORDER BY created DESC' : 'SELECT * FROM projects WHERE published=1 ORDER BY created DESC').all(); return Response.json(data.results); }
export async function onRequestPost({ request, env }) { if (!await authorized(request, env))
    return Response.json({ error: 'Sign in required' }, { status: 401 }); try {
    const f = await request.formData();
    const title = String(f.get('title') || '').trim(), description = String(f.get('description') || '').trim();
    if (!title || !description || title.length > 150 || description.length > 3000)
        return Response.json({ error: 'Enter a title and description within the limits.' }, { status: 400 });
    const id = String(f.get('id') || crypto.randomUUID());
    let image = String(f.get('existingImage') || '');
    if (image && !/^project-[a-zA-Z0-9-]+$/.test(image))
        return Response.json({ error: 'Invalid image' }, { status: 400 });
    const photo = f.get('photo');
    if (photo instanceof File && photo.size) {
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(photo.type) || photo.size > 5 * 1024 * 1024)
            return Response.json({ error: 'Use JPG, PNG or WebP under 5 MB.' }, { status: 400 });
        image = 'project-' + crypto.randomUUID();
        await env.BUCKET.put(image, await photo.arrayBuffer(), { httpMetadata: { contentType: photo.type } });
    }
    await env.DB.prepare('INSERT INTO projects (id,title,category,location,description,image,published,created) VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET title=excluded.title,category=excluded.category,location=excluded.location,description=excluded.description,image=excluded.image,published=excluded.published').bind(id, title, String(f.get('category') || 'Smart Systems').slice(0, 100), String(f.get('location') || '').slice(0, 150), description, image || null, f.get('published') === 'on' ? 1 : 0, Date.now()).run();
    return Response.json({ ok: true });
}
catch {
    return Response.json({ error: 'Could not save project. Please retry.' }, { status: 500 });
} }
export async function onRequestDelete({ request, env }) { if (!await authorized(request, env))
    return Response.json({ error: 'Sign in required' }, { status: 401 }); const { id } = await request.json(); const row = await env.DB.prepare('SELECT image FROM projects WHERE id=?').bind(id).first(); await env.DB.prepare('DELETE FROM projects WHERE id=?').bind(id).run(); if (row?.image)
    await env.BUCKET.delete(String(row.image)); return Response.json({ ok: true }); }
