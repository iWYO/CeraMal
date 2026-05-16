"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { formatPriceHuf } from "@/lib/money";

export function AddToCartPanel({ product }) {
  const { addToCart, itemCount } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const lineTotal = (product.price ?? 0) * (Number(qty) || 1);

  function onAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="inline-flex h-11 items-center overflow-hidden rounded-xl border border-neutral-200 bg-stone-50">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-11 w-11 place-items-center text-neutral-700 hover:bg-white"
            aria-label="Mennyiség csökkentése"
          >
            −
          </button>
          <div className="min-w-16 px-4 text-center text-sm font-medium text-neutral-900">
            {qty} <span className="font-normal text-neutral-500">db</span>
          </div>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="grid h-11 w-11 place-items-center text-neutral-700 hover:bg-white"
            aria-label="Mennyiség növelése"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-amber-700 px-5 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
        >
          {added ? "Kosárba téve" : "Kosárba"}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-neutral-600">Összesen</span>
        <span className="font-medium text-neutral-900">
          {formatPriceHuf(lineTotal)}
        </span>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        A kosárban:{" "}
        <Link
          href="/cart"
          className="font-medium text-neutral-800 hover:text-neutral-900"
        >
          {itemCount}
        </Link>
      </p>
    </div>
  );
}
