import { HeroCarouselAnimated } from "@/components/home/HeroCarouselAnimated";
import { IntroSectionAnimated } from "@/components/home/IntroSectionAnimated";
import { PhilosophyTeaserAnimated } from "@/components/home/PhilosophyTeaserAnimated";
import { ValuesGridAnimated } from "@/components/home/ValuesGridAnimated";
import { ProductHighlightsAnimated } from "@/components/home/ProductHighlightsAnimated";
import { WorkshopTeaser } from "@/components/home/WorkshopTeaser";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured products from Supabase
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("id, name, image_url, description")
    .eq("is_visible", true)
    .eq("is_featured", true)
    .order("display_order", { ascending: true })
    .limit(6);

  // Transform to match ProductHighlights expected format
  const products = (featuredProducts || []).map((product) => ({
    id: product.id,
    imageUrl: product.image_url,
    alt: product.description || product.name,
  }));

  // Fetch hero images and settings
  const { data: heroSettings } = await supabase
    .from("hero_settings")
    .select("*")
    .single();

  const { data: heroImages } = await supabase
    .from("hero_images")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (
    <>
      <HeroCarouselAnimated
        images={heroImages || []}
        settings={
          heroSettings || {
            carousel_enabled: false,
            active_image_id: null,
            transition_duration: 5000,
          }
        }
      />

      <div className="px-6 sm:px-10 lg:px-20 py-12">
        <IntroSectionAnimated text="Kami mengubah limbah kain menjadi karya Patchtern unik yang dibuat dengan tangan. Setiap karya menceritakan kisah keberlanjutan dan kreativitas, memberikan kehidupan baru pada material yang terlupakan dengan desain yang penuh perhatian dan kerajinan yang teliti. Temukan objek fungsional dan seni, yang terlahir kembali dari kain bekas." />
      </div>

      {/* PLACEHOLDER PHILOSOPHY IMAGE - Replace with hands crafting Patchtern */}
      <PhilosophyTeaserAnimated
        // imageUrl="https://placehold.co/800x600/9caf88/white?text=Philosophy+Image"
        title="Filosofi Kami"
        description="Kami percaya pada keindahan ketidaksempurnaan dan kekuatan kesempatan kedua. Karya kami adalah proses penemuan yang perlahan dan penuh pertimbangan, di mana kain yang terbuang dilahirkan kembali menjadi objek fungsional dan seni. Ini adalah penghormatan terhadap konsumsi yang penuh kesadaran dan nilai kerajinan yang bertahan lama."
      />

      <div className="px-6 sm:px-10 lg:px-20 py-24">
        <ProductHighlightsAnimated products={products} />
      </div>

      <ValuesGridAnimated />

      <div className="py-16">
        <WorkshopTeaser />
      </div>
    </>
  );
}
