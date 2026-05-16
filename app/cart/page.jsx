"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/Container";
import { useCart } from "@/context/CartContext";
import { formatPriceHuf } from "@/lib/money";

export default function CartPage() {
  const { items, totalForints, itemCount, removeFromCart, setQuantity, clearCart } =
    useCart();
  const [status, setStatus] = useState(null);

  async function sendDummy() {
    setStatus({ type: "loading", message: "Küldés…" });
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: items.map((it) => it.product.id) }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ type: "ok", message: "Sikeres küldés (dummy végpont)." });
      clearCart();
    } catch {
      setStatus({ type: "error", message: "Hiba történt a küldés során." });
    } finally {
      setTimeout(() => setStatus(null), 2000);
    }
  }

  return (
    <div className="bg-stone-50">
      <Container className="py-12 md:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-neutral-500">
              KOSÁR
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
              Kosár
            </h1>
            <p className="mt-4 text-sm text-neutral-600">
              {itemCount === 0
                ? "A kosarad üres."
                : `${itemCount} termék a kosárban.`}
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-neutral-700 hover:text-neutral-900"
          >
            Vásárlás folytatása
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8">
            <p className="text-sm text-neutral-600">
              Tegyél valamit a{" "}
              <Link
                href="/products"
                className="font-medium text-neutral-900 hover:underline"
              >
                termékek
              </Link>{" "}
              közül a kosárba.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {items.map((it) => (
                <div
                  key={it.product.id}
                  className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200">
                    <Image
                      src={it.product.imageUrl}
                      alt={it.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-900">
                          {it.product.name}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {formatPriceHuf(it.product.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(it.product.id)}
                        className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
                      >
                        Eltávolítás
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="inline-flex h-10 items-center overflow-hidden rounded-xl border border-neutral-200 bg-stone-50">
                        <button
                          type="button"
                          onClick={() => setQuantity(it.product.id, it.quantity - 1)}
                          className="grid h-10 w-10 place-items-center text-neutral-700 hover:bg-white"
                          aria-label="Mennyiség csökkentése"
                        >
                          −
                        </button>
                        <div className="min-w-10 px-3 text-center text-sm font-medium text-neutral-900">
                          {it.quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() => setQuantity(it.product.id, it.quantity + 1)}
                          className="grid h-10 w-10 place-items-center text-neutral-700 hover:bg-white"
                          aria-label="Mennyiség növelése"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-medium text-neutral-900">
                        {formatPriceHuf(it.product.price * it.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Részösszeg</span>
                <span className="font-medium text-neutral-900">
                  {formatPriceHuf(totalForints)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-neutral-600">Szállítás</span>
                <span className="font-medium text-neutral-900">-</span>
              </div>

              <div className="my-4 border-t border-neutral-200" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Végösszeg</span>
                <span className="text-lg font-semibold text-neutral-900">
                  {formatPriceHuf(totalForints)}
                </span>
              </div>

              <button
                type="button"
                onClick={sendDummy}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-amber-700 px-5 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
              >
                Kosár elküldése (dummy)
              </button>

              {status ? (
                <p
                  className={`mt-3 text-xs ${
                    status.type === "ok"
                      ? "text-green-700"
                      : status.type === "error"
                        ? "text-red-700"
                        : "text-neutral-600"
                  }`}
                >
                  {status.message}
                </p>
              ) : null}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

