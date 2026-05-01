exports.handler = async (event, context) => {
  try {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lioneldota2024';
    const { blobs } = context;
    const body = JSON.parse(event.body);
    const { dotaid, password } = body;

    if (password !== ADMIN_PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: 'No autorizado' }) };
    }

    const store = blobs.getStore('players');
    await store.delete(dotaid);
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
