import hero from "@/assets/hero-silk.jpg";
import dressMaterials from "@/assets/cat-dress-materials.jpg";
import silkDressMaterials from "@/assets/cat-silk-dress-materials.jpg";
import banarasi from "@/assets/cat-banarasi.jpg";
import chanderi from "@/assets/cat-chanderi.jpg";
import paithani from "@/assets/cat-paithani.jpg";
import sarees from "@/assets/cat-sarees.jpg";
import cotton from "@/assets/cat-cotton.jpg";
import festive from "@/assets/cat-festive.jpg";
import kanchipuram from "@/assets/cat-kanchipuram.jpg";
import craftVaranasi from "@/assets/craft-varanasi.jpg";
import craftKanchipuram from "@/assets/craft-kanchipuram.jpg";
import craftYeola from "@/assets/craft-yeola.jpg";
import craftJaipur from "@/assets/craft-jaipur.jpg";
import festiveBanner from "@/assets/festive-banner.jpg";
import boutique from "@/assets/boutique.jpg";

export const imageMap: Record<string, string> = {
  hero,
  dressMaterials,
  silkDressMaterials,
  banarasi,
  chanderi,
  paithani,
  sarees,
  cotton,
  festive,
  kanchipuram,
  craftVaranasi,
  craftKanchipuram,
  craftYeola,
  craftJaipur,
  festiveBanner,
  boutique,
};

/** Resolve an imageKey (or a raw URL entered in the admin panel) to a src. */
export function img(key: string | undefined | null): string {
  if (!key) return imageMap.dressMaterials;
  if (key.startsWith("http") || key.startsWith("/") || key.startsWith("data:")) return key;
  return imageMap[key] ?? imageMap.dressMaterials;
}

export const galleryImages = [
  { key: "hero", alt: "Woman draped in a maroon Banarasi silk saree" },
  { key: "paithani", alt: "Peacock green Paithani silk with gold zari pallu" },
  { key: "banarasi", alt: "Banarasi silk with antique gold zari brocade" },
  { key: "sarees", alt: "Royal plum silk saree with gold border" },
  { key: "cotton", alt: "Hand block printed cotton dress materials" },
  { key: "festive", alt: "Festive Indian ethnic suit sets with diyas" },
];

export { hero as heroImage, festiveBanner as festiveBannerImage, boutique as boutiqueImage };
