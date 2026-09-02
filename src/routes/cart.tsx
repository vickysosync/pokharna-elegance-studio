import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Heart } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useStore, inr } from "@/lib/store";
import { img } from "@/lib/images";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart | Pokharna Silk" },
      { name: "description", content: "Review the dress materials and sarees in your Pokharna Silk cart." },
      { property: "og:title", content: "Your Cart | Pokharna Silk" },
      { property: "og:description", content: "Review your selected ethnic wear before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartItems, setQty, removeFromCart, toggleWishlist, totals, settings } = useStore();

  return (
    <SiteLayout>
      <PageHeader eyebrow="Shopping Bag" title="Your Cart" />
      <div className="container-x py-10">
        {cartItems.length === 0 ? (
          <div className="card-surface mx-auto max-w-lg p-12 text-center">
            <h2 className="text-2xl">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add a suit set or saree and it will appear here.
            </p>
            <Link to="/shop" className="btn-base btn-primary mt-6">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {cartItems.map(({ product, qty }) => (
                <li key={product.id} className="card-surface flex flex-col gap-4 p-4 sm:flex-row">
                  <Link to="/product/$id" params={{ id: product.id }} className="shrink-0">
                    <img
                      src={img(product.imageKey)}
                      alt={product.name}
                      className="h-32 w-full rounded-md object-cover sm:w-24"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-base">
                          <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
                            {product.name}
                          </Link>
                        </h2>
                        <p className="text-xs text-muted-foreground">{product.fabric}</p>
                      </div>
                      <p className="font-semibold text-primary">{inr(product.price * qty)}</p>
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="px-3 py-1.5"
                          onClick={() => setQty(product.id, qty - 1)}
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-sm">{qty}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${product.name}`}
                          className="px-3 py-1.5"
                          onClick={() => setQty(product.id, qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="btn-base btn-ghost text-xs"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart size={14} /> Save
                      </button>
                      <button
                        type="button"
                        className="btn-base btn-ghost text-xs text-destructive"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="card-surface h-fit p-6">
              <h2 className="text-xl">Order Summary</h2>
              <div className="gold-rule my-3" />
              <dl className="space-y-2 text-sm">
                <Row label="Subtotal" value={inr(totals.subtotal)} />
                <Row label="You save" value={`− ${inr(totals.savings)}`} />
                <Row label="Cart discount" value={totals.discount ? `− ${inr(totals.discount)}` : "—"} />
                <Row
                  label="Shipping"
                  value={totals.shipping === 0 ? "Free" : inr(totals.shipping)}
                />
                <Row label={`GST (${settings.gstPercent}%)`} value={inr(totals.tax)} />
                <div className="border-t border-border pt-3">
                  <Row label="Grand Total" value={inr(totals.total)} bold />
                </div>
              </dl>
              <Link to="/checkout" className="btn-base btn-primary mt-5 w-full">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="btn-base btn-ghost mt-2 w-full">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${bold ? "text-base font-semibold" : ""}`}>
      <dt className={bold ? "" : "text-muted-foreground"}>{label}</dt>
      <dd className={bold ? "text-primary" : ""}>{value}</dd>
    </div>
  );
}
