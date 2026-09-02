import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useStore, inr } from "@/lib/store";
import { img } from "@/lib/images";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | Pokharna Silk" },
      { name: "description", content: "Your saved silk dress materials and sarees at Pokharna Silk." },
      { property: "og:title", content: "Wishlist | Pokharna Silk" },
      { property: "og:description", content: "Keep track of the weaves you love." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, products, toggleWishlist, moveToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <SiteLayout>
      <PageHeader eyebrow="Saved" title="Your Wishlist" />
      <div className="container-x py-10">
        {items.length === 0 ? (
          <div className="card-surface mx-auto max-w-lg p-12 text-center">
            <h2 className="text-2xl">Nothing saved yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on any product to keep it here for later.
            </p>
            <Link to="/shop" className="btn-base btn-primary mt-6">Browse Collection</Link>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.id} className="card-surface flex gap-4 p-4">
                <Link to="/product/$id" params={{ id: p.id }}>
                  <img src={img(p.imageKey)} alt={p.name} className="h-32 w-24 rounded object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <h2 className="text-base">
                    <Link to="/product/$id" params={{ id: p.id }} className="hover:text-primary">
                      {p.name}
                    </Link>
                  </h2>
                  <p className="text-xs text-muted-foreground">{p.fabric}</p>
                  <p className="mt-1 font-semibold text-primary">{inr(p.price)}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-3">
                    <button type="button" className="btn-base btn-primary text-xs" onClick={() => moveToCart(p.id)}>
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      className="btn-base btn-ghost text-xs text-destructive"
                      onClick={() => toggleWishlist(p.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SiteLayout>
  );
}
