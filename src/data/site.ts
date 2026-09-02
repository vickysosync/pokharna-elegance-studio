export type BusinessInfo = {
  name: string;
  legalName: string;
  owner: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  footerNote: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
};

export const business: BusinessInfo = {
  name: "Pokharna Silk",
  legalName: "Pokharna Silk Dress Material Shop",
  owner: "Ananya Deshmukh",
  phone: "09822216629",
  email: "support.Pokharna211@gmail.com",
  address:
    "Shop No. 1 & 2, Sr. 49, Near Maruti Mandir, Chandan Nagar, Pune, Maharashtra 411014",
  hours: "Monday – Sunday · 10:30 AM – 9:00 PM",
  footerNote:
    "A family-run boutique in Chandan Nagar, Pune, curating genuine unstitched suit sets and sarees from India's finest weaving hubs.",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  whatsapp: "https://wa.me/919822216629",
};

export type Settings = {
  storeName: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  shippingCharge: number;
  freeShippingThreshold: number;
  gstPercent: number;
};

export const defaultSettings: Settings = {
  storeName: "Pokharna Silk",
  phone: business.phone,
  email: business.email,
  address: business.address,
  currency: "INR",
  shippingCharge: 99,
  freeShippingThreshold: 4999,
  gstPercent: 5,
};

export type HomeContent = {
  announcement: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  aboutTitle: string;
  aboutText: string;
  festiveTitle: string;
  festiveSubtitle: string;
  festiveCta: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
};

export const defaultHomeContent: HomeContent = {
  announcement:
    "Authentic Indian Ethnic Wear • Curated with Love from India's Finest Weaving Hubs",
  heroTitle: "Heritage Woven Into Every Thread",
  heroSubtitle:
    "Discover authentic silk, elegant dress materials and timeless Indian craftsmanship, thoughtfully curated for every occasion.",
  heroCtaPrimary: "Shop Collection",
  heroCtaSecondary: "Explore Sarees",
  aboutTitle: "A Canvas of Heritage, Texture and Expression",
  aboutText:
    "At Pokharna Silk, we believe that an Indian suit is more than just clothing — it is a canvas of heritage, texture, and personal expression. For years our little boutique in Chandan Nagar has offered genuine unstitched suit sets and sarees, earning the trust of families across Pune. Every bolt of fabric is chosen by hand from the weaving hubs of Varanasi, Kanchipuram, Yeola and Jaipur.",
  festiveTitle: "Celebrate Every Occasion in Timeless Elegance",
  festiveSubtitle:
    "Zari-woven silks, festive suit sets and heirloom sarees for weddings, Diwali, Navratri and every celebration in between.",
  festiveCta: "Shop Festive Collection",
  newsletterTitle: "Stay in the Loop",
  newsletterSubtitle:
    "Get updates on new arrivals, festive collections and exclusive offers.",
};

export const craftRegions = [
  {
    id: "varanasi",
    name: "Varanasi",
    title: "Banarasi Silk & Zari",
    imageKey: "craftVaranasi",
    text: "On the banks of the Ganga, master weavers lift gold and silver zari through pure silk to create the kadhwa and jaal motifs Banaras is loved for.",
  },
  {
    id: "kanchipuram",
    name: "Kanchipuram",
    title: "Traditional Silk Heritage",
    imageKey: "craftKanchipuram",
    text: "Thick mulberry silk, korvai borders joined by hand and temple-inspired motifs — the south Indian silk that a family keeps for generations.",
  },
  {
    id: "yeola",
    name: "Yeola",
    title: "Maharashtrian Paithani",
    imageKey: "craftYeola",
    text: "Peacocks, lotuses and the unmistakable muniya border, woven inch by inch on pit looms in Yeola — Maharashtra's most treasured drape.",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    title: "Prints & Textile Artistry",
    imageKey: "craftJaipur",
    text: "Hand-carved wooden blocks, natural dyes and the sun-washed courtyards of Rajasthan give our cottons their soft, joyful character.",
  },
];

export const whyChooseUs = [
  {
    title: "Authentic Collections",
    icon: "✶",
    text: "Every weave is verified at source — no mill copies passed off as handloom.",
  },
  {
    title: "Carefully Curated",
    icon: "◈",
    text: "A small, edited selection chosen by our family rather than an endless catalogue.",
  },
  {
    title: "Traditional Craftsmanship",
    icon: "❖",
    text: "Direct relationships with weaving clusters in Varanasi, Yeola and Kanchipuram.",
  },
  {
    title: "Premium Fabrics",
    icon: "◉",
    text: "Pure silks, Chanderi cotton silks and breathable handloom cottons only.",
  },
  {
    title: "Trusted by Families",
    icon: "♡",
    text: "Generations of Pune families return to us for weddings and festivals.",
  },
  {
    title: "Pune-Based Boutique",
    icon: "⌂",
    text: "Visit us in Chandan Nagar — see, feel and drape before you decide.",
  },
];
