import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useStore, inr } from "@/lib/store";
import { customers } from "@/data/customers";
import { orderStatuses } from "@/data/orders";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Pokharna Silk" },
      { name: "description", content: "Store overview for Pokharna Silk staff." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard | Pokharna Silk" },
      { property: "og:description", content: "Store overview for Pokharna Silk staff." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { products, orders } = useStore();

  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "Pending").length;
  const lowStock = products.filter((p) => p.stock <= 5);

  const stats = [
    { label: "Total Products", value: String(products.length) },
    { label: "Total Orders", value: String(orders.length) },
    { label: "Total Customers", value: String(customers.length) },
    { label: "Total Revenue", value: inr(revenue) },
    { label: "Pending Orders", value: String(pending) },
    { label: "Low Stock Products", value: String(lowStock.length) },
  ];

  const byStatus = orderStatuses.map((s) => ({
    status: s,
    count: orders.filter((o) => o.status === s).length,
  }));
  const maxStatus = Math.max(1, ...byStatus.map((b) => b.count));

  const catCounts = [...new Set(products.map((p) => p.category))]
    .map((slug) => ({ slug, count: products.filter((p) => p.category === slug).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const maxCat = Math.max(1, ...catCounts.map((c) => c.count));

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card-surface p-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="text-xl">Orders by Status</h2>
          <ul className="mt-4 space-y-3">
            {byStatus.map((b) => (
              <li key={b.status} className="flex items-center gap-3 text-sm">
                <span className="w-24 shrink-0 text-muted-foreground">{b.status}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${(b.count / maxStatus) * 100}%` }}
                  />
                </span>
                <span className="w-6 text-right font-medium">{b.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-surface p-6">
          <h2 className="text-xl">Products by Category</h2>
          <ul className="mt-4 space-y-3">
            {catCounts.map((c) => (
              <li key={c.slug} className="flex items-center gap-3 text-sm">
                <span className="w-32 shrink-0 truncate text-muted-foreground">{c.slug}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span
                    className="block h-full rounded-full bg-gold"
                    style={{ width: `${(c.count / maxCat) * 100}%` }}
                  />
                </span>
                <span className="w-6 text-right font-medium">{c.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="py-2">Order</th>
                  <th className="py-2">Customer</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-t border-border">
                    <td className="py-2 font-medium">{o.id}</td>
                    <td className="py-2">{o.customerName}</td>
                    <td className="py-2">{inr(o.total)}</td>
                    <td className="py-2">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Low Stock</h2>
            <Link to="/admin/products" className="text-sm text-primary hover:underline">
              Manage
            </Link>
          </div>
          {lowStock.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Every product is well stocked.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border text-sm">
              {lowStock.slice(0, 8).map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2">
                  <span className="truncate pr-3">{p.name}</span>
                  <span className="shrink-0 rounded bg-secondary px-2 py-0.5 text-xs">
                    {p.stock} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
