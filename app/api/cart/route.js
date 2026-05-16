export async function POST(request) {
  let ids = [];
  try {
    const body = await request.json();
    if (Array.isArray(body)) ids = body;
    else if (Array.isArray(body?.ids)) ids = body.ids;
  } catch {
    ids = [];
  }

  return Response.json({
    ok: true,
    message: "A kosarat sikeresen fogadtuk.",
    receivedCount: ids.length,
  });
}
