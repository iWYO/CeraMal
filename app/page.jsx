import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { LandingNewestProducts } from "@/components/LandingNewestProducts";
import { LandingValueProps } from "@/components/LandingValueProps";
import { listProducts } from "@/lib";

export default async function Home() {
  const allProducts = await listProducts();
  const newestProducts = allProducts.slice(0, 4);

  return (
    <div className="bg-stone-50">
      <section className="relative border-b border-neutral-200">
        <div className="absolute inset-0">
          <Image
            src="/landing-hero.jpg"
            alt="CeraMal hero"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0" />
        </div>

        <Container className="relative flex min-h-[45vh] items-center pb-14 pt-12 sm:min-h-[55vh] sm:pt-14 md:pb-20 md:pt-16 lg:min-h-[60vh]">
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold leading-[1.03] tracking-tight text-white sm:text-5xl md:text-6xl">
              Kézzel készült, finom érintéssel és egyedi karakterrel
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-neutral-300">
              Letisztult kerámiák a mindennapokhoz, lassan formázva, gondosan mázazva.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center rounded-none bg-amber-700 px-6 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              >
                Vásárolj a kollekcióból →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <LandingNewestProducts products={newestProducts} />

      <LandingValueProps />
    </div>
  );
}
