export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageKey: string;
  enabled: boolean;
  featured: boolean;
};

export const categories: Category[] = [
  {
    id: "cat-1",
    slug: "dress-materials",
    name: "Dress Materials",
    description: "Unstitched suit sets in cotton, silk blends and handloom weaves.",
    imageKey: "dressMaterials",
    enabled: true,
    featured: false,
  },
  {
    id: "cat-2",
    slug: "silk-dress-materials",
    name: "Silk Dress Materials",
    description: "Lustrous silk suit sets with dupatta, top and bottom.",
    imageKey: "silkDressMaterials",
    enabled: true,
    featured: true,
  },
  {
    id: "cat-3",
    slug: "banarasi-silk",
    name: "Banarasi Silk",
    description: "Zari-woven Banarasi heritage from the looms of Varanasi.",
    imageKey: "banarasi",
    enabled: true,
    featured: true,
  },
  {
    id: "cat-4",
    slug: "chanderi-cotton",
    name: "Chanderi Cotton",
    description: "Feather-light Chanderi with a soft sheen and delicate buttis.",
    imageKey: "chanderi",
    enabled: true,
    featured: true,
  },
  {
    id: "cat-5",
    slug: "paithani",
    name: "Paithani",
    description: "Maharashtrian Paithani with peacock and lotus motifs.",
    imageKey: "paithani",
    enabled: true,
    featured: true,
  },
  {
    id: "cat-6",
    slug: "sarees",
    name: "Sarees",
    description: "Nine yards of heritage — silk, cotton and festive drapes.",
    imageKey: "sarees",
    enabled: true,
    featured: true,
  },
  {
    id: "cat-7",
    slug: "cotton-collection",
    name: "Cotton Collection",
    description: "Breathable everyday cottons and block-printed suit sets.",
    imageKey: "cotton",
    enabled: true,
    featured: false,
  },
  {
    id: "cat-8",
    slug: "festive-collection",
    name: "Festive Collection",
    description: "Celebration-ready zari, silk and richly embellished pieces.",
    imageKey: "festive",
    enabled: true,
    featured: true,
  },
];
