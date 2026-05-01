exports.handler = async (event, context) => {
  try {
    const { blobs } = context;
    const store = blobs.getStore('players');
    const { blobs: list } = await store.list();
    const players = await Promise.all(
      list.map(async ({ key }) => {
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
