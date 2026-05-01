import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lioneldota2024';

  const body = await req.json();
  const { player } = body;

  if (!player || !player.dotaid) {
    return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 });
  }

  const store = getStore('players');

  // Verificar duplicado
  const existing = await store.get(player.dotaid, { type: 'json' });
  if (existing) {
    return new Response(JSON.stringify({ error: 'Ya hay un jugador con esa ID de Dota 2' }), { status: 409 });
  }

  await store.setJSON(player.dotaid, player);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/save-player' };
