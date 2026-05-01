exports.handler = async (event, context) => {
  try {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lioneldota2024';
    const body = JSON.parse(event.body);
    if (body.password === ADMIN_PASSWORD) {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }
    return { statusCode: 401, body: JSON.stringify({ error: 'No autorizado' }) };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
