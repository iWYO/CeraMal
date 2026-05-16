import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/Container";
import { listProducts } from "@/lib";

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="bg-stone-50">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-neutral-500">
              CERAMAL WEBSHOP
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
              Termékek
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
              Minden darab lassan készül és kézzel van mázazva - az apró eltérések a
              különlegesség részei.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 self-start md:mt-0 md:self-auto">
            <span className="text-xs text-neutral-500">Rendezés</span>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-800 hover:bg-neutral-50"
            >
              Kiemelt
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-neutral-500"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-8 text-sm text-neutral-600">
            Jelenleg nincs elérhető termék.
          </div>
        ) : (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

