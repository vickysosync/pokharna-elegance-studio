import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useStore, inr } from "@/lib/store";
import { orderStatuses, type OrderStatus } from "@/data/orders";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Manage Orders | Pokharna Silk Admin" },
      { name: "description", content: "Review orders and update fulfilment status." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Manage Orders | Pokharna Silk Admin" },
      { property: "og:description", content: "Review orders and update fulfilment status." },
    ],
  }),
  component: AdminOrders,
});

function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [open, setOpen] = useState<string | null>(null);

  const rows = orders.filter((o) => status === "all" || o.status === status);

  return (
    <AdminLayout title="Orders">
      <div className="card-surface mb-6 flex flex-wrap items-end gap-3 p-4">
        <div className="min-w-44">
          <label htmlFor="o-status" className="label-x">
            Filter by status
          </label>
          <select
            id="o-status"
            className="field"
            value={status}
            onChange={(e) => setStatus(e.target.value as "all" | OrderStatus)}
          >
            <option value="all">All statuses</option>
            {orderStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-muted-foreground">{rows.length} order(s)</p>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="w-full min-w-[52rem] text-sm">
          <thead className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <>
                <tr key={o.id} className="border-t border-border">
                  <td className="p-3">
                    <button
                      type="button"
                      className="font-medium text-primary hover:underline"
                      onClick={() => setOpen(open === o.id ? null : o.id)}
                      aria-expanded={open === o.id}
                    >
                      {o.id}
                    </button>
                  </td>
                  <td className="p-3">
                    <p>{o.customerName}</p>
                    <p className="text-xs text-muted-foreground">{o.phone}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{o.date}</td>
                  <td className="p-3">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                  <td className="p-3 font-medium">{inr(o.total)}</td>
                  <td className="p-3 text-muted-foreground">{o.paymentMethod}</td>
                  <td className="p-3">
                    <select
                      aria-label={`Status for order ${o.id}`}
                      className="field py-1"
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                    >
                      {orderStatuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                {open === o.id && (
                  <tr key={`${o.id}-detail`} className="border-t border-border bg-secondary/50">
                    <td colSpan={7} className="p-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h3 className="text-sm font-semibold">Products</h3>
                          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                            {o.items.map((i) => (
                              <li key={i.productId}>
                                {i.name} × {i.qty} — {inr(i.price * i.qty)}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <h3 className="text-sm font-semibold text-foreground">Delivery</h3>
                          <p className="mt-2">{o.address}</p>
                          <p>
                            {o.city}, {o.state} — {o.pincode}
                          </p>
                          <p>{o.email}</p>
                          <p className="mt-2">
                            Subtotal {inr(o.subtotal)} · Shipping {inr(o.shipping)} · Discount{" "}
                            {inr(o.discount)}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">No orders in this status.</p>
        )}
      </div>
    </AdminLayout>
  );
}
