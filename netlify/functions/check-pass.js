export default async (req, context) => {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lioneldota2024';
  const body = await req.json();

  if (body.password === ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }
  return new Response(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
};

export const config = { path: '/api/check-pass' };
