import { Link } from "@tanstack/react-router";
import { business } from "@/data/site";
import { useStore } from "@/lib/store";

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="mt-20 border-t border-border bg-secondary/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-2xl font-semibold text-primary">Pokharna Silk</p>
          <div className="gold-rule my-3" />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {business.footerNote}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">{business.hours}</p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="mb-3 text-sm font-semibold tracking-wide">Quick Links</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Customer care">
          <h2 className="mb-3 text-sm font-semibold tracking-wide">Customer Care</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" hash="shipping" className="hover:text-primary">Shipping</Link></li>
            <li><Link to="/contact" hash="returns" className="hover:text-primary">Returns</Link></li>
            <li><Link to="/contact" hash="privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/contact" hash="terms" className="hover:text-primary">Terms &amp; Conditions</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide">Contact</h2>
          <address className="space-y-2 text-sm not-italic text-muted-foreground">
            <p>{settings.address}</p>
            <p>
              <a href={`tel:${settings.phone}`} className="hover:text-primary">{settings.phone}</a>
            </p>
            <p>
              <a href={`mailto:${settings.email}`} className="break-all hover:text-primary">
                {settings.email}
              </a>
            </p>
          </address>
          <div className="mt-4 flex gap-3 text-xs text-muted-foreground">
            <a href={business.instagram} className="hover:text-primary">Instagram</a>
            <a href={business.facebook} className="hover:text-primary">Facebook</a>
            <a href={business.whatsapp} className="hover:text-primary">WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {business.legalName}. All rights reserved.</p>
          <Link
            to="/admin/login"
            className="rounded border border-gold px-3 py-1.5 font-semibold tracking-[0.14em] text-primary transition-colors hover:bg-gold hover:text-gold-foreground"
          >
            ADMIN LOGIN
          </Link>
        </div>
      </div>
    </footer>
  );
}
