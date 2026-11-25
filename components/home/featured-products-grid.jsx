"use client";

import { ProductCard } from "@/components/catalog/product-card";
import {
 HomeShowcaseSlide,
 HomeShowcaseSlider,
} from "@/components/home/home-showcase-slider";
import { useLocale } from "@/contexts/locale-provider";

export function FeaturedProductsGrid({ products }) {
 const { t } = useLocale();

 return (
  <div data-nosnippet>
   <HomeShowcaseSlider
    id="one-cikan-urunler"
    title={t("home.featuredTitle")}
    description={t("home.featuredDescription")}
    itemCount={products.length}
    slidesPerView={2}
   >
    {products.map((product) => (
     <HomeShowcaseSlide key={product.id}>
      <ProductCard
       product={product}
       variant="featured"
       showFavoriteButton
      />
     </HomeShowcaseSlide>
    ))}
   </HomeShowcaseSlider>
  </div>
 );
}
