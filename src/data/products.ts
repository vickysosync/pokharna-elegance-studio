export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string; // category slug
  fabric: string;
  weave: string;
  color: string;
  occasion: string;
  length: string;
  care: string;
  description: string;
  price: number;
  originalPrice: number;
  stock: number;
  rating: number;
  reviews: number;
  imageKey: string;
  collection: string;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  createdAt: string;
};

const care =
  "Dry clean recommended for the first wash. Store folded in a muslin cloth away from direct sunlight. Press on medium heat with a cotton cloth over the zari.";

type Seed = [
  name: string,
  category: string,
  fabric: string,
  weave: string,
  color: string,
  occasion: string,
  price: number,
  originalPrice: number,
  stock: number,
  rating: number,
  reviews: number,
  imageKey: string,
  flags: string,
];

const seeds: Seed[] = [
  ["Banarasi Zari Silk Unstitched Suit", "banarasi-silk", "Pure Banarasi Silk", "Handwoven Zari Buti", "Deep Maroon", "Wedding", 8499, 11999, 12, 4.8, 126, "banarasi", "f b"],
  ["Handwoven Banarasi Silk Suit Set", "banarasi-silk", "Katan Silk", "Kadhwa Zari Weave", "Royal Plum", "Wedding", 10999, 14999, 6, 4.9, 98, "banarasi", "f n"],
  ["Royal Purple Banarasi Saree", "sarees", "Banarasi Katan Silk", "Meenakari Zari Border", "Royal Purple", "Reception", 12499, 15999, 4, 4.9, 143, "sarees", "f b"],
  ["Banarasi Georgette Jaal Saree", "sarees", "Banarasi Georgette", "Jaal Zari Weave", "Antique Gold", "Festive", 7299, 9999, 9, 4.6, 74, "sarees", "n"],
  ["Banarasi Tissue Silk Dress Material", "banarasi-silk", "Tissue Silk", "Zari Stripe", "Ivory Gold", "Engagement", 6499, 8999, 14, 4.5, 61, "banarasi", ""],
  ["Kanchipuram Pure Silk Saree", "sarees", "Kanchipuram Silk", "Korvai Border", "Mustard & Maroon", "Wedding", 14999, 18999, 3, 5.0, 88, "kanchipuram", "f b"],
  ["Kanchi Silk Bridal Dress Material", "silk-dress-materials", "Kanchipuram Silk", "Temple Border Weave", "Rani Pink", "Bridal", 11499, 14499, 5, 4.8, 52, "silkDressMaterials", "f"],
  ["Royal Chanderi Cotton Dress Material", "chanderi-cotton", "Chanderi Cotton Silk", "Handloom Buti", "Powder Blue", "Daywear", 2499, 3499, 28, 4.5, 210, "chanderi", "b"],
  ["Classic Chanderi Floral Suit", "chanderi-cotton", "Chanderi Cotton", "Hand Block Print", "Blush Rose", "Casual", 1899, 2699, 34, 4.4, 178, "chanderi", "n"],
  ["Chanderi Zari Checks Suit Set", "chanderi-cotton", "Chanderi Silk Cotton", "Zari Checks", "Sage Green", "Office", 2799, 3899, 22, 4.6, 96, "chanderi", ""],
  ["Chanderi Kalamkari Dress Material", "chanderi-cotton", "Chanderi Cotton", "Kalamkari Print", "Indigo", "Daywear", 2199, 2999, 19, 4.3, 84, "chanderi", ""],
  ["Traditional Yeola Paithani", "paithani", "Pure Paithani Silk", "Handwoven Peacock Pallu", "Peacock Green", "Wedding", 13999, 17999, 4, 4.9, 112, "paithani", "f b"],
  ["Maharashtrian Paithani Silk Saree", "paithani", "Paithani Silk", "Muniya Border", "Rani Pink", "Festive", 11999, 15499, 6, 4.8, 132, "paithani", "f b"],
  ["Paithani Semi Silk Dress Material", "paithani", "Semi Paithani Silk", "Zari Motif", "Kumkum Red", "Festive", 4999, 6999, 16, 4.5, 67, "paithani", "n"],
  ["Yeola Paithani Dupatta Suit Set", "paithani", "Paithani Silk Blend", "Handwoven Bel", "Turmeric Yellow", "Haldi", 5799, 7999, 11, 4.6, 58, "paithani", ""],
  ["Festive Gold Zari Dress Material", "festive-collection", "Art Silk", "Zari Embroidery", "Antique Gold", "Diwali", 3999, 5499, 24, 4.6, 154, "festive", "f b"],
  ["Festive Silk Suit with Organza Dupatta", "festive-collection", "Silk Blend", "Sequin & Zari", "Wine", "Sangeet", 5499, 7499, 13, 4.7, 91, "festive", "n"],
  ["Navratri Bandhani Dress Material", "festive-collection", "Modal Silk", "Bandhani Tie-Dye", "Marigold", "Navratri", 2899, 3999, 26, 4.4, 118, "festive", ""],
  ["Diwali Special Brocade Suit Set", "festive-collection", "Brocade Silk", "Brocade Zari", "Deep Maroon", "Diwali", 6299, 8499, 10, 4.7, 73, "festive", "f"],
  ["Pure Tussar Silk Dress Material", "silk-dress-materials", "Tussar Silk", "Handpainted Motif", "Beige Gold", "Occasion", 4799, 6499, 15, 4.6, 87, "silkDressMaterials", "b"],
  ["Mysore Silk Unstitched Suit", "silk-dress-materials", "Mysore Silk", "Plain Weave with Zari", "Emerald", "Occasion", 5299, 6999, 12, 4.5, 64, "silkDressMaterials", ""],
  ["Raw Silk Zari Border Suit Set", "silk-dress-materials", "Raw Silk", "Zari Border", "Rust Orange", "Festive", 4599, 6299, 18, 4.4, 55, "silkDressMaterials", "n"],
  ["Bhagalpuri Silk Dress Material", "silk-dress-materials", "Bhagalpuri Silk", "Handloom Texture", "Teal", "Daywear", 3299, 4499, 21, 4.3, 49, "silkDressMaterials", ""],
  ["Lucknowi Chikankari Cotton Suit", "cotton-collection", "Cotton Mul", "Chikankari Hand Embroidery", "Ivory", "Summer", 2999, 4199, 25, 4.7, 165, "cotton", "b"],
  ["Jaipuri Block Print Cotton Suit", "cotton-collection", "Cotton Cambric", "Hand Block Print", "Coral", "Casual", 1499, 2199, 40, 4.3, 232, "cotton", "n"],
  ["Ajrakh Cotton Dress Material", "cotton-collection", "Cotton", "Ajrakh Resist Print", "Indigo Madder", "Daywear", 1799, 2499, 32, 4.4, 108, "cotton", ""],
  ["Kota Doria Cotton Suit Set", "cotton-collection", "Kota Doria Cotton", "Open Weave", "Mint", "Summer", 1299, 1899, 36, 4.2, 94, "cotton", ""],
  ["Maheshwari Handloom Dress Material", "dress-materials", "Maheshwari Cotton Silk", "Reversible Border", "Lavender", "Office", 2699, 3699, 20, 4.5, 76, "dressMaterials", "b"],
  ["Modal Silk Digital Print Suit", "dress-materials", "Modal Silk", "Digital Print", "Peach", "Casual", 2199, 3099, 30, 4.3, 88, "dressMaterials", "n"],
  ["Cotton Silk Embroidered Suit Set", "dress-materials", "Cotton Silk", "Thread Embroidery", "Olive", "Office", 2999, 4199, 17, 4.4, 62, "dressMaterials", ""],
  ["Premium Velvet Dupatta Suit Set", "dress-materials", "Silk with Velvet Dupatta", "Zari & Dori Work", "Bottle Green", "Wedding", 7499, 9999, 8, 4.7, 45, "dressMaterials", "f"],
  ["Handloom Ikat Dress Material", "dress-materials", "Pochampally Cotton", "Ikat Weave", "Black & Ivory", "Daywear", 2599, 3499, 23, 4.5, 71, "dressMaterials", ""],
  ["Soft Silk Temple Border Saree", "sarees", "Soft Silk", "Temple Border", "Kumkum Red", "Pooja", 5999, 7999, 14, 4.6, 103, "sarees", "b"],
  ["Linen Cotton Zari Saree", "sarees", "Linen Cotton", "Zari Stripe", "Slate Grey", "Office", 3499, 4699, 18, 4.4, 66, "sarees", "n"],
];

export const products: Product[] = seeds.map((s, i) => {
  const [name, category, fabric, weave, color, occasion, price, originalPrice, stock, rating, reviews, imageKey, flags] = s;
  const isSaree = category === "sarees" || name.toLowerCase().includes("saree");
  return {
    id: `p-${i + 1}`,
    sku: `PKS-${String(i + 1).padStart(4, "0")}`,
    name,
    category,
    fabric,
    weave,
    color,
    occasion,
    length: isSaree ? "5.5 m saree with 0.8 m blouse piece" : "2.5 m top • 2.5 m bottom • 2.25 m dupatta",
    care,
    description: `${name} — a ${fabric.toLowerCase()} piece finished with ${weave.toLowerCase()}. Hand-picked by our family for its true-to-tradition colour, generous fall and honest craftsmanship. ${
      isSaree
        ? "Comes with an unstitched blouse piece so you can tailor it exactly to your fit."
        : "Supplied as an unstitched suit set with matching dupatta and bottom, ready for your tailor."
    }`,
    price,
    originalPrice,
    stock,
    rating,
    reviews,
    imageKey,
    collection: isSaree ? "Sarees" : "Dress Materials",
    featured: flags.includes("f"),
    bestseller: flags.includes("b"),
    newArrival: flags.includes("n"),
    createdAt: new Date(Date.UTC(2026, 7, 28 - i)).toISOString(),
  };
});

export const discountOf = (p: { price: number; originalPrice: number }) =>
  p.originalPrice > p.price ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
