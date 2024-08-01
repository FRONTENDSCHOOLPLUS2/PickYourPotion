import ProductCard from "@/components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function CardSwiper() {
  return (
    <Swiper width={250} className="mb-12">
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
    </Swiper>
  );
}

export default CardSwiper;
