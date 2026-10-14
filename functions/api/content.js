import { defaults } from '../_lib/content.js';
import { authorized } from '../_lib/auth.js';
export async function onRequestGet({ request, env }) { const row = await env.DB.prepare('SELECT value FROM site_content WHERE id=?').bind('main').first(); return Response.json(row ? { ...defaults, ...JSON.parse(row.value) } : defaults); }
export async function onRequestPost({ request, env }) {
    if (!await authorized(request, env))
        return Response.json({ error: 'Administrator access required' }, { status: 403 });
    try {
        const form = await request.formData();
        const input = JSON.parse(String(form.get('content') || '{}'));
        const next = { ...defaults };
        for (const [key, original] of Object.entries(defaults)) {
            if (key === 'services') {
                if (!Array.isArray(input.services) || input.services.length !== 6)
                    throw Error('Please keep all six service cards.');
                next.services = input.services.map((x) => { for (const k of ['title', 'text', 'list'])
                    if (typeof x[k] !== 'string' || x[k].length > 1000)
                        throw Error('Invalid service text'); return { title: x.title, text: x.text, list: x.list }; });
            }
            else if (typeof original === 'boolean') {
                next[key] = input[key] === true;
            }
            else if (typeof input[key] === 'string' && input[key].length <= 5000) {
                next[key] = input[key];
            }
            else
                throw Error('Invalid content field: ' + key);
        }
        for (const field of ['indiaPhone', 'uaePhone'])
            if (!/^\+?[\d\s()-]{7,30}$/.test(next[field]))
                throw Error('Enter valid contact phone numbers.');
        if (next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email))
            throw Error('Enter a valid email address.');
        if (next.heroImage && !/^project-[a-zA-Z0-9-]+$/.test(next.heroImage))
            throw Error('Invalid banner');
        const image = form.get('banner');
        if (image instanceof File && image.size) {
            if (!['image/png', 'image/jpeg', 'image/webp'].includes(image.type) || image.size > 5 * 1024 * 1024)
                throw Error('Banner must be JPG, PNG or WebP under 5 MB.');
            const key = 'project-' + crypto.randomUUID();
            await env.BUCKET.put(key, await image.arrayBuffer(), { httpMetadata: { contentType: image.type } });
            next.heroImage = key;
        }
        await env.DB.prepare('INSERT INTO site_content (id,value) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET value=excluded.value').bind('main', JSON.stringify(next)).run();
        return Response.json({ ok: true, content: next });
    }
    catch (e) {
        return Response.json({ error: e.message || 'Could not save website content' }, { status: 400 });
    }
}
