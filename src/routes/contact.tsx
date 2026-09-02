import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { business } from "@/data/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Store Visit | Pokharna Silk, Pune" },
      {
        name: "description",
        content:
          "Visit Pokharna Silk at Chandan Nagar, Pune or call 09822216629 for dress materials and sarees.",
      },
      { property: "og:title", content: "Contact & Store Visit | Pokharna Silk, Pune" },
      { property: "og:description", content: "Address, phone, email and enquiry form for Pokharna Silk." },
    ],
  }),
  component: ContactPage,
});

const policies = [
  {
    id: "shipping",
    title: "Shipping",
    text: "Orders are dispatched within 2 working days from our Chandan Nagar boutique. Delivery across India takes 3–7 working days. Free shipping applies above the threshold shown at checkout.",
  },
  {
    id: "returns",
    title: "Returns",
    text: "Unstitched, unwashed pieces can be returned within 7 days in original packaging. Cut or tailored fabric cannot be returned. Refunds are processed within 5 working days of pickup.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    text: "We collect only the details needed to deliver your order and never sell customer information. This demo store keeps all data in your own browser.",
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    text: "Prices are inclusive of taxes and may change without notice. Colours may vary slightly between screens and fabric. Handloom weaves carry natural irregularities, which are a mark of authenticity.",
  },
];

function ContactPage() {
  const { settings } = useStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const set = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="We'd love to help"
        title="Contact Pokharna Silk"
        subtitle="Call, write or simply walk in — we are happy to show you every piece."
      />

      <div className="container-x grid gap-8 py-10 lg:grid-cols-2">
        <section className="card-surface p-7">
          <h2 className="text-2xl">{business.legalName}</h2>
          <div className="gold-rule my-3" />
          <address className="space-y-3 text-sm not-italic leading-relaxed text-muted-foreground">
            <p>{settings.address}</p>
            <p>
              Phone: <a href={`tel:${settings.phone}`} className="text-primary hover:underline">{settings.phone}</a>
            </p>
            <p>
              Email:{" "}
              <a href={`mailto:${settings.email}`} className="break-all text-primary hover:underline">
                {settings.email}
              </a>
            </p>
            <p>{business.hours}</p>
          </address>

          <div
            className="mt-6 grid h-56 place-items-center rounded-lg border border-dashed border-gold bg-secondary/60 text-center"
            role="img"
            aria-label="Map placeholder showing the shop location near Maruti Mandir, Chandan Nagar, Pune"
          >
            <div>
              <p className="eyebrow">Find us</p>
              <p className="mt-1 font-display text-xl">Near Maruti Mandir, Chandan Nagar</p>
              <p className="text-xs text-muted-foreground">Pune, Maharashtra 411014</p>
            </div>
          </div>
        </section>

        <section className="card-surface p-7">
          <h2 className="text-2xl">Send an Enquiry</h2>
          <div className="gold-rule my-3" />
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you! We will get back to you shortly.");
              setForm({ name: "", email: "", phone: "", message: "" });
            }}
          >
            <div>
              <label htmlFor="c-name" className="label-x">Name</label>
              <input id="c-name" required className="field" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label htmlFor="c-email" className="label-x">Email</label>
              <input id="c-email" type="email" required className="field" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </div>
            <div>
              <label htmlFor="c-phone" className="label-x">Phone</label>
              <input id="c-phone" type="tel" required className="field" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div>
              <label htmlFor="c-msg" className="label-x">Message</label>
              <textarea id="c-msg" rows={5} required className="field" value={form.message} onChange={(e) => set("message", e.target.value)} />
            </div>
            <button type="submit" className="btn-base btn-primary w-full">Submit Enquiry</button>
          </form>
        </section>
      </div>

      <section className="container-x pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {policies.map((p) => (
            <article key={p.id} id={p.id} className="card-surface scroll-mt-32 p-6">
              <h2 className="text-xl">{p.title}</h2>
              <div className="gold-rule my-3" />
              <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
