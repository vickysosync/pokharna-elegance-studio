import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { discountOf, type Product } from "@/data/products";
import { img } from "@/lib/images";
import { inr, useStore } from "@/lib/store";
import { Stars } from "@/components/Stars";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const off = discountOf(product);
  const wished = isWished(product.id);

  return (
    <article className="card-surface hover-lift group flex flex-col overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden bg-beige">
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          aria-label={product.name}
          className="block h-full w-full"
        >
          <img
            src={img(product.imageKey)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1">
          {off > 0 && (
            <span className="rounded bg-primary px-2 py-1 text-[10px] font-bold tracking-wider text-primary-foreground">
              {off}% OFF
            </span>
          )}
          {product.newArrival && (
            <span className="rounded bg-gold px-2 py-1 text-[10px] font-bold tracking-wider text-gold-foreground">
              NEW
            </span>
          )}
          {product.bestseller && (
            <span className="rounded bg-plum px-2 py-1 text-[10px] font-bold tracking-wider text-plum-foreground">
              BESTSELLER
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="rounded-full bg-card/90 p-2 shadow-soft transition-colors hover:bg-card"
          >
            <Heart
              size={16}
              className={wished ? "fill-primary text-primary" : "text-foreground"}
            />
          </button>
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              aria-label={`Quick view ${product.name}`}
              className="rounded-full bg-card/90 p-2 shadow-soft transition-colors hover:bg-card"
            >
              <Eye size={16} />
            </button>
          )}
        </div>

        {product.stock === 0 && (
          <div className="absolute inset-0 grid place-items-center bg-background/70">
            <span className="eyebrow">Out of stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {product.fabric}
        </p>
        <h3 className="text-base leading-snug">
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Stars value={product.rating} />
          <span>({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-semibold text-primary">{inr(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {inr(product.originalPrice)}
            </span>
          )}
        </div>
        <button
          type="button"
          className="btn-base btn-primary mt-2 w-full"
          disabled={product.stock === 0}
          onClick={() => addToCart(product.id)}
        >
          <ShoppingBag size={15} /> Add to Cart
        </button>
      </div>
    </article>
  );
}
