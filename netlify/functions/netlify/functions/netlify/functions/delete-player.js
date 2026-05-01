import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lioneldota2024';

  const body = await req.json();
  const { dotaid, password } = body;

  if (password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
  }

  if (!dotaid) {
    return new Response(JSON.stringify({ error: 'Falta ID' }), { status: 400 });
  }

  const store = getStore('players');
  await store.delete(dotaid);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/delete-player' };
