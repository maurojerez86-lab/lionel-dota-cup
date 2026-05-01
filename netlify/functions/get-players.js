import { getStore } from '@netlify/blobs';

export default async (req, context) => {
  const store = getStore('players');
  const { blobs } = await store.list();

  const players = await Promise.all(
    blobs.map(async ({ key }) => {
      const data = await store.get(key, { type: 'json' });
      return data;
    })
  );

  return new Response(JSON.stringify(players.filter(Boolean)), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = { path: '/api/get-players' };
