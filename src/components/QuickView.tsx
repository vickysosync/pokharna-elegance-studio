import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { discountOf, type Product } from "@/data/products";
import { img } from "@/lib/images";
import { inr, useStore } from "@/lib/store";
import { Stars } from "@/components/Stars";

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      onClick={onClose}
    >
      <div
        className="card-surface relative max-h-[88vh] w-full max-w-3xl overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 rounded-full bg-card p-2 shadow-soft"
        >
          <X size={16} />
        </button>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src={img(product.imageKey)}
            alt={product.name}
            className="h-full max-h-[420px] w-full object-cover"
          />
          <div className="flex flex-col gap-3 p-6">
            <p className="eyebrow">{product.collection}</p>
            <h2 className="text-2xl">{product.name}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Stars value={product.rating} /> <span>({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-primary">{inr(product.price)}</span>
              <span className="text-sm text-muted-foreground line-through">
                {inr(product.originalPrice)}
              </span>
              <span className="text-sm font-semibold text-gold">{discountOf(product)}% off</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="label-x">Fabric</dt>
                <dd>{product.fabric}</dd>
              </div>
              <div>
                <dt className="label-x">Weave</dt>
                <dd>{product.weave}</dd>
              </div>
              <div>
                <dt className="label-x">Colour</dt>
                <dd>{product.color}</dd>
              </div>
              <div>
                <dt className="label-x">Occasion</dt>
                <dd>{product.occasion}</dd>
              </div>
            </dl>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn-base btn-primary"
                onClick={() => {
                  addToCart(product.id);
                  onClose();
                }}
              >
                Add to Cart
              </button>
              <Link
                to="/product/$id"
                params={{ id: product.id }}
                className="btn-base btn-outline"
                onClick={onClose}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
