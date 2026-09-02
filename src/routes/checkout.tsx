import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useStore, inr } from "@/lib/store";
import { img } from "@/lib/images";
import type { Order } from "@/data/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | Pokharna Silk" },
      { name: "description", content: "Complete your Pokharna Silk order with Cash on Delivery, UPI or Card." },
      { property: "og:title", content: "Checkout | Pokharna Silk" },
      { property: "og:description", content: "Secure, simple checkout for your ethnic wear order." },
    ],
  }),
  component: CheckoutPage,
});

const payments = ["Cash on Delivery", "UPI", "Card"] as const;

function CheckoutPage() {
  const { cartItems, totals, placeOrder, settings } = useStore();
  const [placed, setPlaced] = useState<Order | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Pune",
    state: "Maharashtra",
    pincode: "",
  });
  const [method, setMethod] = useState<(typeof payments)[number]>("Cash on Delivery");

  const set = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  if (placed) {
    return (
      <SiteLayout>
        <div className="container-x py-20">
          <div className="card-surface mx-auto max-w-xl p-10 text-center">
            <span className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-gold/25 text-2xl text-primary">
              ✓
            </span>
            <h1 className="mt-5 text-3xl">Order Confirmed</h1>
            <div className="gold-rule mx-auto my-4" />
            <p className="text-sm text-muted-foreground">
              Thank you, {placed.customerName}. Your order has been placed and our team will call you
              shortly to confirm.
            </p>
            <p className="mt-5 text-sm">
              Order ID: <strong className="text-primary">{placed.id}</strong>
            </p>
            <p className="text-sm">
              Total paid via {placed.paymentMethod}: <strong>{inr(placed.total)}</strong>
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/shop" className="btn-base btn-primary">Continue Shopping</Link>
              <Link to="/" className="btn-base btn-outline">Back Home</Link>
            </div>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Checkout" title="Nothing to check out" />
        <div className="container-x py-16 text-center">
          <Link to="/shop" className="btn-base btn-primary">Browse the Collection</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PageHeader eyebrow="Almost There" title="Checkout" />
      <form
        className="container-x grid gap-8 py-10 lg:grid-cols-[1fr_380px]"
        onSubmit={(e) => {
          e.preventDefault();
          const order = placeOrder({
            customerName: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode,
            items: cartItems.map(({ product, qty }) => ({
              productId: product.id,
              name: product.name,
              price: product.price,
              qty,
              imageKey: product.imageKey,
            })),
            subtotal: totals.subtotal,
            shipping: totals.shipping,
            discount: totals.discount,
            total: totals.total,
            paymentMethod: method,
          });
          setPlaced(order);
        }}
      >
        <div className="space-y-6">
          <section className="card-surface p-6">
            <h2 className="text-xl">Delivery Details</h2>
            <div className="gold-rule my-3" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Full Name" value={form.name} onChange={(v) => set("name", v)} />
              <Field id="phone" label="Mobile Number" type="tel" pattern="[0-9]{10}" value={form.phone} onChange={(v) => set("phone", v)} />
              <Field id="email" label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} />
              <Field id="pincode" label="Pincode" pattern="[0-9]{6}" value={form.pincode} onChange={(v) => set("pincode", v)} />
              <div className="sm:col-span-2">
                <label htmlFor="address" className="label-x">Address</label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  className="field"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                />
              </div>
              <Field id="city" label="City" value={form.city} onChange={(v) => set("city", v)} />
              <Field id="state" label="State" value={form.state} onChange={(v) => set("state", v)} />
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="text-xl">Payment Method</h2>
            <div className="gold-rule my-3" />
            <fieldset className="space-y-2">
              <legend className="sr-only">Choose a payment method</legend>
              {payments.map((p) => (
                <label
                  key={p}
                  className="flex cursor-pointer items-center gap-3 rounded border border-border p-3 text-sm"
                >
                  <input
                    type="radio"
                    name="payment"
                    className="accent-[var(--primary)]"
                    checked={method === p}
                    onChange={() => setMethod(p)}
                  />
                  {p}
                </label>
              ))}
            </fieldset>
            <p className="mt-3 text-xs text-muted-foreground">
              Demo checkout — no real payment is processed.
            </p>
          </section>
        </div>

        <aside className="card-surface h-fit p-6">
          <h2 className="text-xl">Order Summary</h2>
          <div className="gold-rule my-3" />
          <ul className="space-y-3">
            {cartItems.map(({ product, qty }) => (
              <li key={product.id} className="flex items-center gap-3 text-sm">
                <img src={img(product.imageKey)} alt="" className="h-14 w-12 rounded object-cover" />
                <span className="flex-1">
                  {product.name}
                  <span className="block text-xs text-muted-foreground">Qty {qty}</span>
                </span>
                <span>{inr(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <SumRow label="Subtotal" value={inr(totals.subtotal)} />
            <SumRow label="Discount" value={totals.discount ? `− ${inr(totals.discount)}` : "—"} />
            <SumRow label="Shipping" value={totals.shipping === 0 ? "Free" : inr(totals.shipping)} />
            <SumRow label={`GST (${settings.gstPercent}%)`} value={inr(totals.tax)} />
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd className="text-primary">{inr(totals.total)}</dd>
            </div>
          </dl>
          <button type="submit" className="btn-base btn-primary mt-5 w-full">
            Place Order
          </button>
        </aside>
      </form>
    </SiteLayout>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  pattern,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  pattern?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-x">{label}</label>
      <input
        id={id}
        type={type}
        pattern={pattern}
        required
        className="field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
