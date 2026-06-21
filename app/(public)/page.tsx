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
        <IntroSectionAnimated text="Patchtern lahir dari proses melihat kembali apa yang selama ini terabaikan. Dari potongan-potongan kain yang tersisa setiap hari di ruang produksi, kami menyusunnya kembali menjadi pola baru yang memiliki nilai, fungsi, dan cerita—bukan sekadar membuat sesuatu dari sisa, tetapi memilih cara yang berbeda untuk melihatnya." />
      </div>

      {/* PLACEHOLDER PHILOSOPHY IMAGE - Replace with hands crafting Patchtern */}
      <PhilosophyTeaserAnimated
        // imageUrl="https://placehold.co/800x600/9caf88/white?text=Philosophy+Image"
        title="Filosofi Kami"
        description="Bagi kami, limbah bukan akhir dari sebuah proses, melainkan bagian yang belum selesai. Setiap potongan kain kami susun kembali dengan pelan dan sadar—mengubah yang dianggap berakhir menjadi kemungkinan baru."
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
