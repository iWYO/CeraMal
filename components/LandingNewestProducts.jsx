import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { formatPriceHuf } from "@/lib/money";

export function LandingNewestProducts({ products }) {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <Container className="py-14 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 md:text-xl">
            Legújabb termékeink
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-neutral-700 transition-colors hover:text-neutral-900"
          >
            Összes termék →
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="group">
              <Link
                href={`/products/${p.id}`}
                className="block overflow-hidden bg-neutral-100"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>
              <div className="mt-3 flex items-start justify-between gap-3">
                <Link
                  href={`/products/${p.id}`}
                  className="min-w-0 text-sm font-medium text-neutral-900 hover:underline"
                >
                  {p.name}
                </Link>
                <span className="shrink-0 text-sm font-medium text-neutral-900">
                  {formatPriceHuf(p.price)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
