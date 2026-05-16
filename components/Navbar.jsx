"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Container } from "@/components/Container";

const links = [
  { href: "/", label: "Főoldal" },
  { href: "/products", label: "Termékek" },
  { href: "/cart", label: "Kosár" },
];

function linkClass(active, mobile) {
  if (mobile) {
    return active
      ? "block rounded-lg bg-neutral-100 px-3 py-3 text-base font-medium text-neutral-900"
      : "block rounded-lg px-3 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50";
  }
  return active
    ? "text-sm text-neutral-900"
    : "text-sm text-neutral-600 hover:text-neutral-900";
}

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function isActive(href) {
    return pathname === href || (href !== "/" && pathname?.startsWith(href));
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white">
      {menuOpen ? (
        <button
          type="button"
          aria-label="Menü bezárása"
          className="fixed inset-0 z-30 bg-black/25 md:hidden"
          onClick={closeMenu}
        />
      ) : null}

      <Container className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative h-7 w-7 overflow-hidden rounded-full border border-neutral-200 bg-white">
            <Image
              src="/favico.svg"
              alt="CeraMal logó"
              fill
              unoptimized
              className="object-contain p-1"
            />
          </span>
          <span className="text-sm font-semibold tracking-wide text-neutral-900">
            CeraMal
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={linkClass(isActive(l.href), false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 bg-white md:hidden"
          >
            <span className="text-lg leading-none text-neutral-800">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>

          <Link href="/cart" aria-label="Kosár" className="relative">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="h-5 w-5 text-neutral-800"
              >
                <path d="M6 7h15l-1.5 9h-12L6 7Z" />
                <path d="M6 7 5 3H2" />
                <path d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                <path d="M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              </svg>
            </span>
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-amber-700 px-1 text-[11px] font-medium text-white">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </Container>

      {menuOpen ? (
        <nav className="border-b border-neutral-200 bg-white md:hidden">
          <Container className="flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={linkClass(isActive(l.href), true)}
              >
                {l.label}
              </Link>
            ))}
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
