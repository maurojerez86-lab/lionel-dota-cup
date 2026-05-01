exports.handler = async (event, context) => {
  try {
    const { blobs } = context;
    const body = JSON.parse(event.body);
    const { player } = body;

    if (!player || !player.dotaid) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Datos inválidos' }) };
    }

    const store = blobs.getStore('players');

    let existing = null;
    try { existing = await store.get(player.dotaid, { type: 'json' }); } catch(e) {}
    if (existing) {
      return { statusCode: 409, body: JSON.stringify({ error: 'Ya hay un jugador con esa ID' }) };
    }

    await store.setJSON(player.dotaid, player);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
