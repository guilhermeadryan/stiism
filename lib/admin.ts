import {createHash,timingSafeEqual} from 'node:crypto';import {database} from '../db';
export const digest=(s:string)=>createHash('sha256').update(s).digest('hex');
export function safeWrite(req:Request){if(req.headers.get('x-head-write')!=='1'||req.headers.get('sec-fetch-site')==='cross-site')return false;const origin=req.headers.get('origin');if(origin){const host=req.headers.get('host')||new URL(req.url).host;try{if(new URL(origin).host!==host)return false}catch{return false}}return true}
export function sessionToken(req:Request){return req.headers.get('cookie')?.split(';').map(s=>s.trim()).find(s=>s.startsWith('head_admin='))?.slice(11)}
export function sessionHash(token:string){return digest(token+'|'+(process.env.ADMIN_PASSWORD||''))}
export async function authorized(req:Request){const token=sessionToken(req);if(!token||!process.env.ADMIN_PASSWORD)return false;const db=await database();const {rows}=await db.query('SELECT expires FROM hp_admin_sessions WHERE id=$1',[sessionHash(token)]);return !!rows[0]&&Number(rows[0].expires)>Date.now()}
export function verify(password:string){const expected=process.env.ADMIN_PASSWORD;if(!expected||expected.length<12)throw Error('ADMIN_PASSWORD missing or too short');return timingSafeEqual(createHash('sha256').update(password).digest(),createHash('sha256').update(expected).digest())}
export function adminCookie(token:string,age:number){return `head_admin=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${process.env.NODE_ENV==='production'?'; Secure':''}`}
