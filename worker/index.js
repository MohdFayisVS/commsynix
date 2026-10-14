import * as auth from '../functions/api/auth.js';
import * as content from '../functions/api/content.js';
import * as projects from '../functions/api/projects.js';
import * as testimonials from '../functions/api/testimonials.js';
import * as images from '../functions/api/images.js';
import {onRequest as middleware} from '../functions/api/_middleware.js';
const routes={auth,content,projects,testimonials,images};
export default {async fetch(request,env,ctx){const path=new URL(request.url).pathname;if(path.startsWith('/api/')){const handler=routes[path.slice(5)];return middleware({request,env,next:async()=>{if(!handler)return Response.json({error:'Not found'},{status:404});const name={GET:'onRequestGet',POST:'onRequestPost',DELETE:'onRequestDelete'}[request.method];if(!name||!handler[name])return Response.json({error:'Method not allowed'},{status:405});return handler[name]({request,env,waitUntil:ctx.waitUntil.bind(ctx)});}});}return env.ASSETS.fetch(request);}};
