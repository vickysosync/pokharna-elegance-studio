import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { Stars } from "@/components/Stars";
import { useStore, inr } from "@/lib/store";
import { img, galleryImages } from "@/lib/images";
import { discountOf, products as seedProducts } from "@/data/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = seedProducts.find((x) => x.id === params.id);
    return p ? { name: p.name, description: p.description } : null;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product | Pokharna Silk" },
          { name: "description", content: "Explore premium Indian dress materials and sarees at Pokharna Silk." },
        ],
      };
    }
    const title = `${loaderData.name} | Pokharna Silk`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description.slice(0, 155) },
      ],
    };
  },
  component: ProductPage,
});

const tabs = ["Product Details", "Fabric & Craft", "Care Instructions", "Shipping", "Returns"] as const;

function ProductPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { productById, products, addToCart, toggleWishlist, isWished, settings } = useStore();
  const product = productById(id);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Product Details");
  const [activeImg, setActiveImg] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (!product) {
    return (
      <SiteLayout>
        <div className="container-x py-24 text-center">
          <h1 className="text-3xl">Product not found</h1>
          <Link to="/shop" className="btn-base btn-primary mt-6">Back to Shop</Link>
        </div>
      </SiteLayout>
    );
  }

  const gallery = [
    product.imageKey,
    ...galleryImages.map((g) => g.key).filter((k) => k !== product.imageKey).slice(0, 3),
  ];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const off = discountOf(product);
  const wished = isWished(product.id);

  const tabBody: Record<string, React.ReactNode> = {
    "Product Details": (
      <dl className="grid gap-3 sm:grid-cols-2">
        {[
          ["SKU", product.sku],
          ["Colour", product.color],
          ["Occasion", product.occasion],
          ["Length", product.length],
          ["Collection", product.collection],
          ["Availability", product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="label-x">{k}</dt>
            <dd className="text-sm">{v}</dd>
          </div>
        ))}
      </dl>
    ),
    "Fabric & Craft": (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Fabric: <strong className="text-foreground">{product.fabric}</strong>. Weave / work:{" "}
        <strong className="text-foreground">{product.weave}</strong>. {product.description}
      </p>
    ),
    "Care Instructions": (
      <p className="text-sm leading-relaxed text-muted-foreground">{product.care}</p>
    ),
    Shipping: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Dispatched from our Chandan Nagar boutique within 2 working days. Flat{" "}
        {inr(settings.shippingCharge)} shipping across India, free above{" "}
        {inr(settings.freeShippingThreshold)}. Delivery in 3–7 working days.
      </p>
    ),
    Returns: (
      <p className="text-sm leading-relaxed text-muted-foreground">
        Easy 7-day return for unstitched, unwashed pieces with original packaging. Cut or tailored
        fabric cannot be returned. Refunds are processed within 5 working days of pickup.
      </p>
    ),
  };

  return (
    <SiteLayout>
      <div className="container-x py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-primary">Shop</Link> /{" "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div
              className="card-surface overflow-hidden"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <img
                src={img(gallery[activeImg])}
                alt={product.name}
                className={`aspect-[4/5] w-full object-cover transition-transform duration-500 ${
                  zoom ? "scale-110" : "scale-100"
                }`}
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g + i}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`overflow-hidden rounded-md border ${
                    i === activeImg ? "border-gold" : "border-border"
                  }`}
                >
                  <img src={img(g)} alt="" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">{product.fabric}</p>
            <h1 className="mt-2 text-3xl md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Stars value={product.rating} size={15} />
              <span>{product.rating.toFixed(1)} · {product.reviews} reviews</span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-semibold text-primary">{inr(product.price)}</span>
              {off > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {inr(product.originalPrice)}
                  </span>
                  <span className="rounded bg-gold px-2 py-1 text-xs font-bold text-gold-foreground">
                    {off}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <p className="mt-4 text-sm">
              Availability:{" "}
              <strong className={product.stock > 0 ? "text-success" : "text-destructive"}>
                {product.stock > 0 ? `In stock (${product.stock} left)` : "Out of stock"}
              </strong>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded border border-border">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="px-3 py-2"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="w-10 text-center text-sm" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="px-3 py-2"
                  onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="btn-base btn-primary"
                disabled={product.stock === 0}
                onClick={() => addToCart(product.id, qty)}
              >
                Add to Cart
              </button>
              <button
                type="button"
                className="btn-base btn-gold"
                disabled={product.stock === 0}
                onClick={() => {
                  addToCart(product.id, qty);
                  navigate({ to: "/checkout" });
                }}
              >
                Buy Now
              </button>
              <button
                type="button"
                className="btn-base btn-outline"
                aria-pressed={wished}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={15} className={wished ? "fill-primary" : ""} />
                {wished ? "Wishlisted" : "Wishlist"}
              </button>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2 border-b border-border">
                {tabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`px-3 py-2 text-sm font-medium ${
                      tab === t
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="py-5">{tabBody[tab]}</div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl">Related Products</h2>
            <div className="gold-rule my-4" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
