import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import { sortOptions } from "@/components/ProductFilters";
import { useStore } from "@/lib/store";
import { categories as seedCategories } from "@/data/categories";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const cat = seedCategories.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return { name: cat.name, description: cat.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category unavailable | Pokharna Silk" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} | Pokharna Silk`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const { products, categories } = useStore();
  const [sort, setSort] = useState("featured");
  const [quick, setQuick] = useState<Product | null>(null);

  const cat = categories.find((c) => c.slug === category);
  const list = useMemo(() => {
    const items = products.filter((p) => p.category === category);
    const sorted = [...items];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "newest") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, category, sort]);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Collection"
        title={cat?.name ?? "Collection"}
        subtitle={cat?.description}
      />
      <div className="container-x py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{list.length} products</p>
          <div>
            <label htmlFor="cat-sort" className="sr-only">Sort by</label>
            <select
              id="cat-sort"
              className="field w-auto"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="card-surface p-12 text-center">
            <h2 className="text-xl">Nothing here just yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              New pieces arrive every week — browse the full collection meanwhile.
            </p>
            <Link to="/shop" className="btn-base btn-primary mt-5">Browse Shop</Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuick} />
            ))}
          </div>
        )}
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </SiteLayout>
  );
}
