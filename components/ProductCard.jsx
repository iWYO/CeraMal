"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPriceHuf } from "@/lib/money";

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group">
      <Link
        href={`/products/${product.id}`}
        className="block overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-200 transition-shadow group-hover:shadow-sm"
      >
        <div className="relative aspect-[4/5] w-full bg-neutral-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/products/${product.id}`}
            className="block truncate text-sm font-medium text-neutral-900"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-xs text-neutral-500">{product.category}</p>
        </div>
        <p className="shrink-0 text-sm font-medium text-neutral-900">
          {formatPriceHuf(product.price)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => addToCart(product, 1)}
        className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-xl bg-amber-700 text-sm font-medium text-white transition-colors hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
      >
        Kosárba
      </button>
    </div>
  );
}

