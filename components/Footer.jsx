import Link from "next/link";
import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <div>
          <p className="text-sm font-semibold text-neutral-900">CeraMal</p>
          <p className="mt-1 max-w-sm text-sm text-neutral-600">
            Kézműves kerámiák a mindennapokhoz.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-600">
          <Link href="/" className="hover:text-neutral-900">
            Főoldal
          </Link>
          <Link href="/products" className="hover:text-neutral-900">
            Termékek
          </Link>
          <Link href="/cart" className="hover:text-neutral-900">
            Kosár
          </Link>
        </nav>
      </Container>
      <div className="border-t border-neutral-100 bg-neutral-50/80">
        <Container className="py-4">
          <p className="text-center text-xs text-neutral-500 md:text-left">
            © {new Date().getFullYear()} CeraMal. Minden jog fenntartva.
          </p>
        </Container>
      </div>
    </footer>
  );
}
