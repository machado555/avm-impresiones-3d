import { CategoryGrid } from "@/components/sections/category-grid";
import { CustomProcess } from "@/components/sections/custom-process";
import { HeroSection } from "@/components/sections/hero-section";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { RewardsPreview } from "@/components/sections/rewards-preview";
import { getCategories } from "@/features/products/data/get-categories";
import { getFeaturedProducts } from "@/features/products/data/get-featured-products";

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategories(), getFeaturedProducts(3)]);

  return (
    <>
      <HeroSection />
      <CategoryGrid categoriesData={categories} />
      <ProductShowcase products={products} />
      <CustomProcess />
      <RewardsPreview />
    </>
  );
}
