import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { craftRegions, business } from "@/data/site";
import { img, boutiqueImage, heroImage } from "@/lib/images";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | Pokharna Silk, Pune" },
      {
        name: "description",
        content:
          "Pokharna Silk is a family-run Pune boutique offering genuine unstitched suit sets and sarees from Varanasi, Kanchipuram, Yeola and Jaipur.",
      },
      { property: "og:title", content: "Our Story | Pokharna Silk, Pune" },
      {
        property: "og:description",
        content: "Indian textile heritage, honestly sourced and carefully curated in Chandan Nagar.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { home } = useStore();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Since generations"
        title="A Boutique Built on Trust"
        subtitle="Genuine weaves, honest pricing and the patience to help you find the right piece."
      />

      <section className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
        <img
          src={boutiqueImage}
          alt="The Pokharna Silk boutique in Chandan Nagar, Pune"
          className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft"
        />
        <div>
          <h2 className="text-3xl">{home.aboutTitle}</h2>
          <div className="gold-rule my-4" />
          <p className="text-sm leading-relaxed text-muted-foreground">{home.aboutText}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Our shelves hold unstitched suit sets in Chanderi, Maheshwari, Tussar and modal silk,
            alongside Banarasi, Kanchipuram and Paithani sarees kept for weddings and festivals.
            Nothing reaches the shop without being seen, felt and verified at source — because a
            family buying a wedding saree deserves the real thing.
          </p>
        </div>
      </section>

      <section className="bg-secondary/50 py-14">
        <div className="container-x">
          <div className="text-center">
            <p className="eyebrow">Where our fabric comes from</p>
            <h2 className="mt-2 text-3xl">Four Weaving Hubs</h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {craftRegions.map((r) => (
              <article key={r.id} className="card-surface overflow-hidden">
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
        </div>
      </section>

      <section className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Our promise</p>
          <h2 className="mt-2 text-3xl">Quality and Authenticity</h2>
          <div className="gold-rule my-4" />
          <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>• Pure silk sold as pure silk — blends are always labelled as blends.</li>
            <li>• Generous unstitched sets with matching dupatta and bottom fabric.</li>
            <li>• Colour-fast dyes and pre-checked zari on every festive piece.</li>
            <li>• Guidance on tailoring, draping and care from our family, not a script.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-base btn-primary">Shop the Collection</Link>
            <Link to="/contact" className="btn-base btn-outline">Visit the Boutique</Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">{business.address}</p>
        </div>
        <img
          src={heroImage}
          alt="Handwoven Banarasi silk saree with gold zari"
          loading="lazy"
          className="aspect-[4/5] w-full rounded-lg object-cover shadow-soft"
        />
      </section>
    </SiteLayout>
  );
}
