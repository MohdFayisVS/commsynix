import { authorized } from '../_lib/auth.js';
export async function onRequestGet({ request, env }) { const admin = new URL(request.url).searchParams.has('admin'); if (admin && !await authorized(request, env))
    return Response.json({ error: 'Administrator access required' }, { status: 403 }); const rows = await env.DB.prepare(admin ? 'SELECT * FROM testimonials ORDER BY created DESC' : 'SELECT * FROM testimonials WHERE published=1 ORDER BY created DESC').all(); return Response.json(rows.results); }
export async function onRequestPost({ request, env }) { if (!await authorized(request, env))
    return Response.json({ error: 'Administrator access required' }, { status: 403 }); try {
    const d = await request.json();
    for (const key of ['name', 'quote'])
        if (typeof d[key] !== 'string' || !d[key].trim())
            throw Error('Name and testimonial are required.');
    if (d.name.length > 150 || d.quote.length > 3000)
        throw Error('Name or testimonial is too long.');
    await env.DB.prepare('INSERT INTO testimonials (id,name,role,company,quote,published,created) VALUES (?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,role=excluded.role,company=excluded.company,quote=excluded.quote,published=excluded.published').bind(d.id || crypto.randomUUID(), d.name.trim(), String(d.role || '').slice(0, 150), String(d.company || '').slice(0, 150), d.quote.trim(), d.published ? 1 : 0, Date.now()).run();
    return Response.json({ ok: true });
}
catch (e) {
    return Response.json({ error: e.message || 'Could not save testimonial' }, { status: 400 });
} }
export async function onRequestDelete({ request, env }) { if (!await authorized(request, env))
    return Response.json({ error: 'Administrator access required' }, { status: 403 }); const d = await request.json(); await env.DB.prepare('DELETE FROM testimonials WHERE id=?').bind(d.id).run(); return Response.json({ ok: true }); }
