import { listProducts } from "@/lib";

export async function GET() {
  const items = await listProducts();
  return Response.json(items, { status: 200 });
}

