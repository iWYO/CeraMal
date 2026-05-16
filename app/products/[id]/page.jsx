import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getProductById } from "@/lib";
import { formatPriceHuf } from "@/lib/money";
import { AddToCartPanel } from "./ui";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="bg-stone-50">
      <Container className="py-10 md:py-14">
        <div className="text-xs text-neutral-500">
          <Link href="/products" className="hover:text-neutral-900">
            Termékek
          </Link>{" "}
          <span className="text-neutral-300">/</span> {product.category}{" "}
          <span className="text-neutral-300">/</span> {product.name}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          <div className="relative min-h-0 w-full lg:h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-stone-100 ring-1 ring-neutral-200 lg:aspect-auto lg:h-full lg:min-h-0">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <div className="flex min-h-0 flex-col">
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
              {product.name}
            </h1>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline justify-between gap-6">
              <p className="text-2xl font-medium text-neutral-900">
                {formatPriceHuf(product.price)}
              </p>
              <p className="text-xs text-neutral-500">Elérhetőség: raktáron</p>
            </div>

            <div className="mt-8">
              <AddToCartPanel product={product} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
