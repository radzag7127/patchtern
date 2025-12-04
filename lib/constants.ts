export const SITE_CONFIG = {
  name: "Patchtern",
  tagline: "Mengupcycle limbah kain menjadi pola baru yang bermakna",
  description:
    "Brand kreatif yang mengolah limbah fashion menjadi karya Patchtern modern bernilai estetika dan berkelanjutan",
} as const;

export const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/about" },
  { label: "Produk", href: "/products" },
  { label: "Filosofi", href: "/philosophy" },
  { label: "Workshop", href: "/workshop" },
  { label: "Kontak", href: "/contact" },
] as const;

export const PRODUCT_CATEGORIES = [
  { value: "all", label: "Semua" },
  { value: "bag", label: "Tas" },
  { value: "pouch", label: "Pouch" },
  { value: "decor", label: "Dekorasi" },
] as const;
