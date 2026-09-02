import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import { Stars } from "@/components/Stars";
import { useStore } from "@/lib/store";
import { img, heroImage, festiveBannerImage, boutiqueImage, galleryImages } from "@/lib/images";
import { craftRegions, whyChooseUs } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pokharna Silk | Premium Indian Dress Materials & Sarees" },
      {
        name: "description",
        content:
          "Authentic Banarasi, Chanderi, Paithani and silk dress materials plus sarees, curated in Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Pokharna Silk | Premium Indian Dress Materials & Sarees" },
      {
        property: "og:description",
        content: "Heritage woven into every thread — unstitched suit sets and sarees from India's finest weaving hubs.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { products, categories, home } = useStore();
  const [quick, setQuick] = useState<Product | null>(null);
  const [email, setEmail] = useState("");

  const featured = useMemo(() => products.filter((p) => p.featured).slice(0, 8), [products]);
  const best = useMemo(() => products.filter((p) => p.bestseller).slice(0, 8), [products]);
  const shopCats = useMemo(
    () => categories.filter((c) => c.enabled && c.featured).slice(0, 6),
    [categories],
  );

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-veil">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="eyebrow">Since generations · Chandan Nagar, Pune</p>
            <h1 className="mt-3 text-4xl leading-[1.1] md:text-6xl">{home.heroTitle}</h1>
            <div className="gold-rule my-5" />
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {home.heroSubtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-base btn-primary">
                {home.heroCtaPrimary}
              </Link>
              <Link
                to="/category/$category"
                params={{ category: "sarees" }}
                className="btn-base btn-outline"
              >
                {home.heroCtaSecondary}
              </Link>
            </div>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["30+", "Curated weaves"],
                ["4", "Weaving hubs"],
                ["1000+", "Happy families"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-semibold text-primary">{n}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-lg border border-gold/50" aria-hidden="true" />
            <img
              src={heroImage}
              alt="Woman draped in a maroon Banarasi silk saree with gold zari work"
              className="relative aspect-[4/5] w-full rounded-lg object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section eyebrow="Explore" title="Shop by Category">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shopCats.map((c) => (
            <Link
              key={c.id}
              to="/category/$category"
              params={{ category: c.slug }}
              className="card-surface hover-lift group relative block overflow-hidden"
            >
              <img
                src={img(c.imageKey)}
                alt={c.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-xl">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <span className="eyebrow mt-3 inline-block">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured */}
      <Section eyebrow="Handpicked" title="Featured Collection" bg>
        <Grid products={featured} onQuickView={setQuick} />
        <div className="mt-8 text-center">
          <Link to="/shop" className="btn-base btn-outline">
            View All Products
          </Link>
        </div>
      </Section>

      {/* About */}
      <section className="container-x grid items-center gap-10 py-16 lg:grid-cols-2">
        <img
          src={boutiqueImage}
          alt="Inside the Pokharna Silk boutique in Chandan Nagar, Pune"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft"
        />
        <div>
          <p className="eyebrow">About Pokharna Silk</p>
          <h2 className="mt-2 text-3xl md:text-4xl">{home.aboutTitle}</h2>
          <div className="gold-rule my-4" />
          <p className="text-sm leading-relaxed text-muted-foreground">{home.aboutText}</p>
          <Link to="/about" className="btn-base btn-primary mt-6">
            Know Our Story
          </Link>
        </div>
      </section>

      {/* Craft regions */}
      <Section eyebrow="Craftsmanship" title="Woven Across India" bg>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {craftRegions.map((r) => (
            <article key={r.id} className="card-surface hover-lift overflow-hidden">
              <img
                src={img(r.imageKey)}
                alt={`${r.name} — ${r.title}`}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <p className="eyebrow">{r.name}</p>
                <h3 className="mt-1 text-lg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Best sellers */}
      <Section eyebrow="Loved in Pune" title="Best Sellers">
        <Grid products={best} onQuickView={setQuick} />
      </Section>

      {/* Festive banner */}
      <section className="relative overflow-hidden">
        <img
          src={festiveBannerImage}
          alt="Festive Indian ethnic wear collection"
          loading="lazy"
          className="h-[380px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-transparent" />
        <div className="container-x absolute inset-0 flex items-center">
          <div className="max-w-lg">
            <p className="eyebrow">Festive Collection</p>
            <h2 className="mt-2 text-3xl md:text-4xl">{home.festiveTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {home.festiveSubtitle}
            </p>
            <Link
              to="/category/$category"
              params={{ category: "festive-collection" }}
              className="btn-base btn-gold mt-6"
            >
              {home.festiveCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <Section eyebrow="Why Pokharna Silk" title="Reasons Families Return" bg>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((w) => (
            <div key={w.title} className="card-surface p-6">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 place-items-center rounded-full bg-gold/20 text-lg text-primary"
              >
                {w.icon}
              </span>
              <h3 className="mt-4 text-lg">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section eyebrow="Testimonials" title="What Our Customers Say">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="card-surface p-6">
              <Stars value={t.rating} />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
                “{t.review}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted-foreground"> · {t.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Gallery */}
      <Section eyebrow="@pokharnasilk" title="From Our Boutique" bg>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {galleryImages.map((g) => (
            <img
              key={g.key}
              src={img(g.key)}
              alt={g.alt}
              loading="lazy"
              className="aspect-square w-full rounded-md object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <section className="container-x pb-16">
        <div className="bg-royal rounded-lg px-6 py-12 text-center text-primary-foreground">
          <h2 className="text-3xl">{home.newsletterTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm opacity-90">{home.newsletterSubtitle}</p>
          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(`Subscribed with ${email}`);
              setEmail("");
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              className="field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-base btn-gold">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </SiteLayout>
  );
}

function Section({
  eyebrow,
  title,
  bg,
  children,
}: {
  eyebrow: string;
  title: string;
  bg?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={bg ? "bg-secondary/50 py-16" : "py-16"}>
      <div className="container-x">
        <div className="mb-8 text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-4xl">{title}</h2>
          <div className="gold-rule mx-auto mt-4" />
        </div>
        {children}
      </div>
    </section>
  );
}

function Grid({
  products,
  onQuickView,
}: {
  products: Product[];
  onQuickView: (p: Product) => void;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
      ))}
    </div>
  );
}
