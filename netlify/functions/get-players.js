const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  try {
    const store = getStore('players');
    const { blobs } = await store.list();
    const players = await Promise.all(
      blobs.map(async ({ key }) => {
        try { return await store.get(key, { type: 'json' }); } catch(e) { return null; }
      })
    );
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(players.filter(Boolean))
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
